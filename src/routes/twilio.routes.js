const express = require("express");
const router = express.Router();
const twilioController = require("../controllers/twilio.controller");

router.post("/webhook", twilioController.webhook);
router.post("/webhook-exception", twilioController.webhookException);

module.exports = router;
