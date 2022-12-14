const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  usernames: [{ type: String }],
  messageCount: { type: Number, default: 0, required: true },
  messages: [
    {
      author: { type: String, required: true },
      content: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
      translations: {},
    },
  ],
});

const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;
