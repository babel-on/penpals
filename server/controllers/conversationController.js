const Conversation = require('../models/conversationModel');
const User = require('../models/userModel');
const fetchTranslation = require('../utls/fetchTranslation');

const conversationController = {};

conversationController.getConversations = async (req, res, next) => {
  // LATER, find out where this userID is being saved in prev middleware
  try {
    const user = await User.findOne({ _id: res.locals.userId });
    res.locals.conversations = user.conversations.map((conversation) => {
      return {
        lastAuthor: conversation.messages.at(-1).author,
        lastContent: conversation.messages.at(-1).content,
        lastTime: conversation.messages.at(-1).createdAt,
      };
    });
    next();
  } catch (err) {
    next({
      log: 'Error occured in getConversations',
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
        message: "That conversation doesn't exist",
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
  try {
    // verify user jwt before this
    const user = await User.findOne({ _id: res.locals.userId });
    // right now this is blank,
    // later, we might also want to specifiy another user(s) to also add this convo ref to
    const conversation = Conversation.create({});
    user.conversations.push(conversation);
    next();
  } catch (err) {
    next({
      log: 'Error occured in addConversation',
      status: 500,
      message: 'An error occured creating a conversation',
    });
  }
};

module.exports = conversationController;
