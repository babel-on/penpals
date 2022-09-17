const User = require('../models/userModel');
const userController = {};
const bcrypt = require('bcryptjs');

// create user
userController.createUser = (req, res, next) => {
  User.create({
    // password value might need to be chaged when we have bcrypt done
    username: req.body.username,
    passwordhash: req.body.password,
    language: req.body.language,
  })
    .then((data) => {
      res.locals.userData = data;
      return next();
    })
    .catch((e) => next(e));
};

// verify user
userController.verifyUser = (req, res, next) => {
  User.findOne({
    // finding user based on user name and password
    username: req.body.username,
    // password value might need to be chaged when we have bcrypt done
    passwordhash: req.body.password,
  })
    .then((data) => {
      if (data && bcrypt.compareSync(req.body.password,this.password)) {
        res.locals.userData = data; 
        return next(); 
      }
      else return next('Error, username or password incorrect.');
    });
};

module.exports = userController;