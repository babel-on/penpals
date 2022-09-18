const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  language: { type: String, required: true },
  partners: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  conversations: {
    type: Map,
    of: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' },
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
