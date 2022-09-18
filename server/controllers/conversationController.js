const Conversation = require('../models/conversationModel');
const User = require('../models/userModel');
const fetchTranslation = require('../utls/fetchTranslation');

const conversationController = {};

conversationController.getConversations = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: res.locals.user.userId }).populate(
      'conversations'
    );
    const conversations = [];
    // res.locals.conversations = user.conversations
    //   .values()
    //   .map((conversation) => {
    //     console.log(conversation);
    //     if (conversation.messageCount === 0)
    //       return {
    //         id: conversation._id,
    //         messageCount: 0,
    //         partner: conversation.usernames.find(
    //           (name) => name !== user.username
    //         ),
    //       };
    //     // we're returning the username that doesn't belong to the current user here
    //     // this will work fine for 2-person convos but would need to be refactored if 3+ convos are implemented
    //     else
    //       return {
    //         id: conversation._id,
    //         partner: conversation.users.find((name) => name !== user.username),
    //         lastAuthor: conversation.messages.at(-1).author,
    //         lastContent: conversation.messages.at(-1).content,
    //         lastTime: conversation.messages.at(-1).createdAt,
    //         messageCount: conversation.messageCount,
    //       };
    //   });

    // unfortunately, since this is a map instead of an object, we have to build the results ourselves
    // instead of using .map like civilized people...
    for (const conversation of user.conversations.values()) {
      if (conversation.messageCount === 0)
        conversations.push({
          id: conversation._id,
          messageCount: 0,
          partner: conversation.usernames.find(
            (name) => name !== user.username
          ),
        });
      else {
        conversations.push({
          id: conversation._id,
          partner: conversation.usernames.find(
            (name) => name !== user.username
          ),
          lastAuthor: conversation.messages.at(-1).author,
          lastContent: conversation.messages.at(-1).content,
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
    res.locals.conversation = conversation.messages.map((message) => {
      return {
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
  try {
    // verify user jwt before this
    const [creator, invitee] = await Promise.all([
      User.findOne({ _id: res.locals.user.userId }).populate('conversations'),
      User.findOne({ _id: req.body.invitee }).populate('conversations'),
    ]);
    if (creator.conversations && creator.conversations[req.body.invitee]) {
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
      translations: {
        [res.locals.user.language]: req.body.content,
      },
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
