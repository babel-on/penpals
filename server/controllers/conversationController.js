const Conversation = require('../models/conversationModel');
const User = require('../models/userModel');
const fetchTranslation = require('../utls/fetchTranslation');

const conversationController = {};

// these all require a logged in user, and must be called after jwtController.verify
conversationController.getConversations = async (req, res, next) => {
  // gets a truncated list of all of the logged in user's conversations
  try {
    const user = await User.findOne({ _id: res.locals.user.userId }).populate(
      'conversations'
    );
    const conversations = [];
    // unfortunately, since this is a map instead of an object, we have to build the results ourselves
    // instead of using .map like civilized people...
    for (const conversation of user.conversations.values()) {
      await conversation.populate('users');
      const partner = conversation.users.find(
        (usr) => usr._id.toString() !== user._id.toString()
      );
      if (conversation.messageCount === 0)
        conversations.push({
          id: conversation._id,
          messageCount: 0,
          partner: partner.username,
          partnerLanguage: partner.language,
        });
      else {
        // if the most recent message hasn't been translated to the current user's language yet, here we call the API to translate it
        if (
          !(
            conversation.messages.at(-1).translations &&
            res.locals.user.language in
              conversation.messages.at(-1).translations
          )
        ) {
          const translation = await fetchTranslation(
            res.locals.user.language,
            conversation.messages.at(-1).content
          );
          if (!conversation.messages.at(-1).translations)
            conversation.messages[
              conversation.messages.length - 1
            ].translations = {};
          conversation.messages[conversation.messages.length - 1].translations[
            res.locals.user.language
          ] = translation.text;
          conversation.markModified('messages');
          await conversation.save();
        }
        conversations.push({
          id: conversation._id,
          partner: partner.username,
          partnerLanguage: partner.language,
          lastAuthor: conversation.messages.at(-1).author,
          lastContent:
            conversation.messages.at(-1).translations[res.locals.user.language],
          lastTime: conversation.messages.at(-1).createdAt,
          messageCount: conversation.messageCount,
        });
      }
    }
    res.locals.conversations = conversations;
    next();
  } catch (err) {
    next({
      log: 'Error occured in getConversations: ' + err,
      status: 500,
      message: 'An error occured retriving conversation list',
    });
  }
};

conversationController.getConversation = async (req, res, next) => {
  // gets all of the messages of a single conversation
  // this function will call fetchTranslation as needed to generate translations as needed
  // these translations are saved to avoid unnecessary API calls
  try {
    const lang = res.locals.user.language;
    const conversation = await Conversation.findOne({ _id: req.params.id });
    if (!conversation)
      return next({
        log: null,
        status: 400,
        message: 'That conversation does not exist',
      });
    const userHasAccess = conversation.users.find(
      (user) => user._id.toString() === res.locals.user.userId
    );
    if (!userHasAccess)
      return next({
        log: null,
        status: 403,
        message: 'You are not a member of this conversations',
      });
    for (const message of conversation.messages) {
      if (!(lang in message.translations)) {
        const translation = await fetchTranslation(lang, message.content);
        message.translations[lang] = translation.text;
        conversation.markModified('messages');
      }
    }
    // res.locals.messageCount = conversation.messageCount;
    res.locals.conversation = conversation.messages.map((message) => {
      return {
        id: message._id,
        author: message.author,
        createdAt: message.createdAt,
        content: message.translations[lang],
      };
    });
    await conversation.save();
    next();
  } catch (err) {
    next({
      log: 'Error occured in getConversation: ' + err,
      status: 500,
      message: 'An error occured retriving messages',
    });
  }
};

conversationController.addConversation = async (req, res, next) => {
  // creates a new conversation between the logged-in user and the user specified in the request body
  try {
    // verify user jwt before this
    console.log(req.body);
    console.log(res.locals.user);
    const [creator, invitee] = await Promise.all([
      User.findOne({ _id: res.locals.user.userId }),
      User.findOne({ _id: req.body.invitee }),
    ]);
    console.log(creator, invitee);
    if (creator.partners && creator.partners[req.body.invitee]) {
      // check if the conversation already exists between those 2 users
      return next({
        log: null,
        status: 400,
        message: 'You already have an existing conversation with this user',
      });
    }
    const conversation = await Conversation.create({
      users: [creator, invitee],
      usernames: [creator.username, invitee.username],
      messages: [],
    });
    if (!creator.conversations) creator.conversations = {};
    if (!invitee.conversations) invitee.conversations = {};
    creator.conversations.set(invitee._id.toString(), conversation);
    invitee.conversations.set(creator._id.toString(), conversation);
    creator.partners.push(invitee);
    invitee.partners.push(creator);
    await Promise.all([creator.save(), invitee.save()]);
    res.locals.conversation = { id: conversation._id };
    next();
  } catch (err) {
    next({
      log: 'Error occured in addConversation: ' + err,
      status: 500,
      message: 'An error occured creating a conversation',
    });
  }
};

conversationController.addMessageToConversation = async (req, res, next) => {
  // adds a message to a conversation
  try {
    const conversation = await Conversation.findOne({ _id: req.params.id });
    if (!conversation.usernames.includes(res.locals.user.username)) {
      return next({
        log: null,
        status: 403,
        message: 'You are not a member of this converstation.',
      });
    }

    const message = {
      author: res.locals.user.username,
      content: req.body.content,
      // we also add the message as-is as a valid translation for the user's current language
      // translations: {
      //   [res.locals.user.language]: req.body.content,
      // },
      // ↑ disabled, because it was confusing for demonstrations
    };
    conversation.messages.push(message);
    res.locals.message = message;
    conversation.messageCount++;
    await conversation.save();
    next();
  } catch (err) {
    next({
      log: 'Error occured in addMessageToConversation: ' + err,
      status: 500,
      message: 'An error occured adding a message',
    });
  }
};

conversationController.deleteMessageFromConversation = async (
  // deletes a single message based on the messageId provided in the request body
  // messages can only be deleted by the user who created them
  req,
  res,
  next
) => {
  if (!req.body.messageId)
    return next({
      log: null,
      status: 400,
      message: 'MessageId to delete not specified',
    });
  const conversation = await Conversation.findOne({ _id: req.params.id });
  if (!conversation)
    return next({
      log: null,
      status: 400,
      message: 'That conversation does not exist.',
    });
  const messageIdx = conversation.messages.findIndex(
    (mes) => mes._id.toString() === req.body.messageId
  );
  if (messageIdx === -1)
    return next({
      log: null,
      status: 400,
      message: 'Invalid messageId to delete',
    });
  if (conversation.messages[messageIdx].author !== res.locals.user.username)
    return next({
      log: null,
      status: 403,
      message: 'You can only delete your own messages',
    });
  conversation.messages = [
    ...conversation.messages.slice(0, messageIdx),
    ...conversation.messages.slice(messageIdx + 1),
  ];
  conversation.markModified('messages');
  conversation.messageCount--;
  await conversation.save();
  next();
};

conversationController.editMessageInConversation = async (req, res, next) => {
  if (!req.body.content)
    return next({
      log: null,
      status: 400,
      message: 'New message content not provided',
    });
  if (!req.body.messageId)
    return next({
      log: null,
      status: 400,
      message: 'MessageId to edit not specified',
    });
  const conversation = await Conversation.findOne({ _id: req.params.id });
  if (!conversation)
    return next({
      log: null,
      status: 400,
      message: 'That conversation does not exist.',
    });
  const messageIdx = conversation.messages.findIndex(
    (mes) => mes._id.toString() === req.body.messageId
  );
  if (messageIdx === -1)
    return next({
      log: null,
      status: 400,
      message: 'Invalid messageId to edit',
    });
  if (conversation.messages[messageIdx].author !== res.locals.user.username)
    return next({
      log: null,
      status: 403,
      message: 'You can only edit your own messages',
    });
  conversation.messages[messageIdx].content = req.body.content;
  conversation.messages[messageIdx].translations = {
    [res.locals.user.language]: req.body.content,
  };
  conversation.markModified('messages');
  res.locals.message = conversation.messages[messageIdx];
  await conversation.save();
  next();
};

// Conversations are currently between 2 users, with the other added on creation
// this may be of use if/when conversations are able to be expanded to more people

// conversationController.addUserToConversation = async (req, res, next) => {
//   try {
//     // verify user jwt before this
//     const [user, invitee, conversation] = await Promise.all([
//       User.findOne({ _id: res.locals.user.userId }),
//       User.findOne({ _id: req.body.id }),
//       Conversation.findOne({ _id: req.params.id }),
//     ]);
//     // user is the current user who is adding a friend to the convo
//     if (!(user in conversation.users))
//       return next({
//         log: null,
//         err: 403,
//         message:
//           'You cannot add a user to a conversation that you are not a part of',
//       });
//     invitee.conversations.push(conversation);
//     conversation.users.push(invitee);
//     await Promise.all([invitee.save(), conversation.save()]);
//     next();
//   } catch (err) {
//     next({
//       log: 'Error occured in addUserToConversation',
//       status: 500,
//       message: 'An error occured adding user to conversation',
//     });
//   }
// };

module.exports = conversationController;
