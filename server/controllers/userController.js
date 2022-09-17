const User = require('../models/userModel');
const userController = {};
const bcrypt = require('bcryptjs');

const SALT_WORK_FACTOR = 10;

// create user
userController.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, SALT_WORK_FACTOR)
    .then((hashedPass) => {
      User.create({
        username: req.body.username,
        passwordHash: hashedPass,
        language: req.body.language
      })
        .then(createdUser => {
          res.locals.createdUser = createdUser;
          next();
        })
        .catch(err => next({
          log: 'userController.createUser ERROR',
          status: 500,
          message: {err: 'userController.createUser ERROR: Username already exists'}}))
    })
    .catch(err => next({
      log: 'userController.createUser ERROR',
      status: 500,
      message: {err: 'userController.createUser ERROR: Password has failed'}
    }));
};

// verify user
userController.verifyUser = async (req, res, next) => {
  try {
    const user = await User.findOne({username: req.body.username});
    const passwordOk = await bcrypt.compare(req.body.password, user.password);
    if (passwordOk){
      res.locals.user = user;
      return next();
    }
    return next({
      log: 'userController.verifyUser ERROR',
      status: 500,
      message: {err: 'userController.verifyUser ERROR: Invalid Username or password'}
    })
  } catch {
    return next({
      log: 'userController.verifyUser ERROR',
      status: 500,
      message: {err: 'userController.verifyUser ERROR: Error verifying user'}
    });
  }
};

module.exports = userController;