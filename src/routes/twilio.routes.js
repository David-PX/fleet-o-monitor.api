const express = require('express');
const router = express.Router();
const twilioController = require('../controllers/twilio.controller');

router.post('/webhook', twilioController.webhook);
router.post('/webhook-exception', twilioController.webhookException);
router.post('/send-message', twilioController.sendMessage);
router.post('/message-status', twilioController.messageStatus);
router.post('/make-call', twilioController.makeCall);
router.post('/whatever', twilioController.whatever);

module.exports = router;
