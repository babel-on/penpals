const express = require('express');
const jwtController = require('../controllers/jwtController.js');
const router = express.Router();
// require controller
const userController = require('../controllers/userController.js');

//handle login
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

module.exports = router;
