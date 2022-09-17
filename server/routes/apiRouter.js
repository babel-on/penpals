const express = require('express');
const path = require('path');
const app = require('../server');
const router = express.Router();
// require controller
const userController = require('../controllers/userController.js');
const { useController } = require('react-hook-form');

//handle login
router.post('/login', userController.verifyUser, (req, res) => {
  res.status(200).json(res.locals.userData);
});

router.post('/signUp', useController.createUser, (req, res) => {
  res.status(200).json(res.locals.createdUser);
});

module.exports = router;
