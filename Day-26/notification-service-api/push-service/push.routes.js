const express = require('express');
const router = express.Router();
const { sendPushNotification } = require('./push.controller');

router.post('/send', sendPushNotification);

module.exports = router;