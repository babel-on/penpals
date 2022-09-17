const express = require('express');
const path = require('path');
const app = require('../server');
const router = express.Router();
// require controller
const userController = require('../controllers/userController.js');

//handle login
router.post('/login', userController.verifyUser, (req, res) => {
  res.status(200).json(res.locals.userData);
});



module.exports = router;
