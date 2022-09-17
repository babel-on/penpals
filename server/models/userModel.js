const mongoose = require('mongoose');


const salt = 10;
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  language: { type: String, required: true },
  conversations: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' },
  ],
});

userSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, salt);
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
