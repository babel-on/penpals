const Conversation = require('../models/conversationModel');
const User = require('../models/userModel');
const fetchTranslation = require('../utls/fetchTranslation');

const conversationController = {};

conversationController.getConversations = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: res.locals.user.userId }).populate(
      'conversations'
    );
    res.locals.conversations = user.conversations.map((conversation) => {
      if (conversation.messages.length === 0) return { messageCount: 0 };
      else
        return {
          lastAuthor: conversation.messages.at(-1).author,
          lastContent: conversation.messages.at(-1).content,
          lastTime: conversation.messages.at(-1).createdAt,
          messageCount: conversation.messages.length,
        };
    });
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
  // needs checking if the user (from previous middleware function) has access to this convo
  // will do later when the method is clearer
  try {
    const lang = res.locals.language;
    const conversation = await Conversation.findOne({ _id: req.params.id });
    if (!conversation)
      return next({
        log: null,
        status: 400,
        message: 'That conversation does not exist',
      });
    for (const message of conversation.messages) {
      if (!(lang in message.translations)) {
        message.translations[lang] = await fetchTranslation(
          lang,
          message.content
        );
      }
    }
    await conversation.save();
    res.locals.conversation = conversation.messages.map((message) => {
      return {
        author: message.author,
        createdAt: message.createdAt,
        content: message.translations[lang],
      };
    });
    next();
  } catch (err) {
    next({
      log: 'Error occured in getConversation',
      status: 500,
      message: 'An error occured retriving messages',
    });
  }
};

conversationController.addConversation = async (req, res, next) => {
  console.log(res.locals);
  try {
    // verify user jwt before this
    const user = await User.findOne({ _id: res.locals.user.userId });
    // right now this is blank,
    // later, we might also want to specifiy another user(s) to also add this convo ref to
    const conversation = await Conversation.create({
      users: [user],
      messages: [],
    });
    user.conversations.push(conversation);
    await user.save();
    res.locals.conversation = { id: conversation._id };
    next();
  } catch (err) {
    next({
      log: 'Error occured in addConversation',
      status: 500,
      message: 'An error occured creating a conversation',
    });
  }
};

conversationController.addMessageToConversation = async (req, res, next) => {
  try {
    // verify user jwt before this
    const user = await User.findOne({ _id: res.locals.user.userId });
    const conversation = user.conversations.find(
      (convo) => convo._id.toString() === req.params.id
    );
    if (!conversation)
      return next({
        log: null,
        status: 404,
        message:
          'Cannot find conversation. Conversations are only available to users in them',
      });
    conversation.messages.push({
      author: res.locals.username,
      content: req.body.content,
      translations: {},
    });
    user.save();
  } catch (err) {
    next({
      log: 'Error occured in addMessageToConversation',
      status: 500,
      message: 'An error occured adding a message',
    });
  }
};

conversationController.addUserToConversation = async (req, res, next) => {
  try {
    // verify user jwt before this
    const [user, invitee, conversation] = await Promise.all([
      User.findOne({ _id: res.locals.user.userId }),
      User.findOne({ _id: req.body.id }),
      Conversation.findOne({ _id: req.params.id }),
    ]);
    // user is the current user who is adding a friend to the convo
    if (!(user in conversation.users))
      return next({
        log: null,
        err: 403,
        message:
          'You cannot add a user to a conversation that you are not a part of',
      });
    invitee.conversations.push(conversation);
    conversation.users.push(invitee);
    await Promise.all([invitee.save(), conversation.save()]);
    next();
  } catch (err) {
    next({
      log: 'Error occured in addUserToConversation',
      status: 500,
      message: 'An error occured adding user to conversation',
    });
  }
};

module.exports = conversationController;
