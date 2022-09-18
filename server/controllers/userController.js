const User = require('../models/userModel');
const userController = {};
const bcrypt = require('bcryptjs');

const SALT_WORK_FACTOR = 10;
const langCode = {
  BG: 'Bulgarian',
  CS: 'Czech',
  DA: 'Danish',
  DE: 'German',
  EL: 'Greek',
  'EN-GB': 'English (British)',
  'EN-US': 'English (American)',
  ES: 'Spanish',
  ET: 'Estonian',
  FI: 'Finnish',
  FR: 'French',
  HU: 'Hungarian',
  ID: 'Indonesian',
  IT: 'Italian',
  JA: 'Japanese',
  LT: 'Lithuanian',
  LV: 'Latvian',
  NL: 'Dutch',
  PL: 'Polish',
  'PT-BR': 'Portuguese (Brazilian)',
  'PT-PT ': 'Portuguese (Other)',
  RU: 'Russian',
  SK: 'Slovak',
  SL: 'Slovenian',
  SV: 'Swedish',
  TR: 'Turkish',
  UK: 'Ukrainian',
  ZH: 'Chinese ',
};
// create user
userController.createUser = async (req, res, next) => {
  if (!req.body.username)
    return next({
      log: null,
      status: 400,
      message: 'Username required',
    });
  if (!req.body.password)
    return next({
      log: null,
      status: 400,
      message: 'Password required',
    });
  if (!req.body.language)
    return next({
      log: null,
      status: 400,
      message: 'Language required',
    });
  if (!(req.body.language in langCode))
    return next({
      log: null,
      status: 400,
      message: 'Language not supported',
    });

  try {
    const passwordHash = await bcrypt.hash(req.body.password, SALT_WORK_FACTOR);
    const user = await User.create({
      username: req.body.username,
      passwordHash: passwordHash,
      language: req.body.language,
      conversations: {},
    });
    res.locals.user = {
      username: user.username,
      _id: user._id,
      language: user.language,
    };
    next();
  } catch (err) {
    next({
      log: 'Error occured in createUser: ' + err,
      status: 500,
      message: 'An error occured creating the user',
    });
  }
};

// verify user
userController.verifyUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    const passwordOk = await bcrypt.compare(
      req.body.password,
      user.passwordHash
    );
    if (passwordOk) {
      const resObj = {
        _id: user._id,
        conversations: user.conversations,
        language: user.language,
        username: user.username,
      };
      res.locals.user = resObj;
      return next();
    }
    return next({
      log: null,
      status: 500,
      message: {
        err: 'userController.verifyUser ERROR: Invalid Username or password',
      },
    });
  } catch (err) {
    return next({
      log: 'userController.verifyUser ERROR: ' + err,
      status: 500,
      message: { err: 'userController.verifyUser ERROR: Error verifying user' },
    });
  }
};

userController.changeLanguage = async (req, res, next) => {
  if (!req.body.language || !(req.body.language in langCode)) {
    return next({
      log: null,
      status: 400,
      message: 'Invalid language',
    });
  }
  const user = await User.findOneAndUpdate(
    { _id: res.locals.user.userId },
    { language: req.body.language },
    { new: true }
  );
  res.locals.user = {
    username: user.username,
    _id: user._id,
    language: user.language,
  };
  next();
};

// get 10 users info
userController.get10Users = async (req, res, next) => {
  const currUser = req.query.user;
  try {
    const users = await User.find({});
    // list of all users
    let allusers = [];
    users.map((user) => {
      if (user._id == currUser) {
        console.log('FOUND and EXCLUDED');
      } else allusers.push(user);
    });
    allusers = allusers.map((user) => {
      return {
        _id: user._id,
        username: user.username,
        language: langCode[user.language],  
      };
    });
    const randomUsers = [];

    if (allusers.length < 10) {
      res.locals.userList = allusers;
      return next();
    }
    while (randomUsers.length <= 10) {
      const randomNum = Math.floor(Math.random() * allusers.length);
      if (randomUsers.includes(allusers[randomNum]))
        randomUsers.push(allusers[randomNum]);
    }
    res.locals.userList = randomUsers;
    return next();
  } catch (err) {
    return next({
      log: 'userController.verifyUser ERROR: ' + err,
      status: 500,
      message: {
        err: 'userController.get10Users ERROR: Error getting random 10 user',
      },
    });
  }
};
module.exports = userController;
