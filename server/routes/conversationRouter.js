const express = require('express');
const conversationController = require('../controllers/conversationController');
const jwtController = require('../controllers/jwtController');
const router = express.Router();

router.get(
  '/',
  jwtController.verifyUser,
  conversationController.getConversations,
  (req, res) => {
    res.status(200).json(res.locals.conversations);
  }
);

module.exports = router;
