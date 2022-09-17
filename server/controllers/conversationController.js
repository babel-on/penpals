const Conversation = require('../models/conversationModel');

const conversationController = {};

conversationController.getConversation = async (req, res, next) => {
  const lang = res.locals.language;
  const conversation = await Conversation.findOne({ _id: req.params.id });
  if (!conversation)
    return next({
      log: null,
      status: 400,
      message: "That conversation doesn't exist",
    });
  // This probably isn't going to work for actually iterating through the conversation
  // will look again later
  for (const message of conversation) {
    if (!(lang in message.translations)) {
      message.translations[lang] = await FetchTranslation(
        lang,
        message.content
      );
    }
  }
  await conversation.save();
  // save to locals and next

  // set up error catching
};

module.exports = conversationController;
