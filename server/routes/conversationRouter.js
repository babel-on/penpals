const express = require('express');
const conversationController = require('../controllers/conversationController');
const jwtController = require('../controllers/jwtController');
const router = express.Router();

router.get(
  '/',
  jwtController.verify,
  conversationController.getConversations,
  (req, res) => {
    res.status(200).json(res.locals.conversations);
  }
);

router.post(
  '/',
  jwtController.verify,
  conversationController.addConversation,
  (req, res) => {
    res.status(200).json(res.locals.conversation);
  }
);

router.post(
  '/:id',
  jwtController.verify,
  conversationController.addMessageToConversation,
  (req, res) => {
    res.status(200).json(res.locals.message);
  }
);

module.exports = router;
