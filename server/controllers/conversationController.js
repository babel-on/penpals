const Conversation = require('../models/conversationModel');

const conversationController = {};

conversationController.getConversation = async (req, res, next) => {
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
        message.translations[lang] = await FetchTranslation(
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

module.exports = conversationController;
