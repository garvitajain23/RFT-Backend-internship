const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notification.controller');
const authenticate = require('../../../shared/middlewares/auth.middleware');

router.post('/send-reminder', authenticate, notificationController.sendReminder);
router.post('/run-due-check', authenticate, notificationController.runDueCheck);

module.exports = router;