const express = require('express');
const jwtController = require('../controllers/jwtController.js');
const conversationRouter = require('./conversationRouter');
const router = express.Router();
// require controller
const userController = require('../controllers/userController.js');

//handle login
router.use('/conversation', conversationRouter);
router.post(
  '/login',
  userController.verifyUser,
  jwtController.write,
  (req, res) => {
    res.status(200).json(res.locals.user);
  }
);

router.post(
  '/register',
  userController.createUser,
  jwtController.write,
  (req, res) => {
    res.status(200).json(res.locals.user);
  }
);

router.get(
  '/getusers',
  jwtController.verify,
  userController.get10Users,
  (req, res) => {
    res.status(200).json(res.locals.users);
  }
);

router.put(
  '/language',
  jwtController.verify,
  userController.changeLanguage,
  jwtController.write,
  (req, res) => {
    res.status(200).json(res.locals.user);
  }
);

module.exports = router;

// get all users that have not made convos to
