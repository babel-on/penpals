const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  message: [
    {
      author: { type: String, required: true },
      content: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
      translations: {
        language: { type: String, required: true },
      },
    },
  ],
});

const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;
