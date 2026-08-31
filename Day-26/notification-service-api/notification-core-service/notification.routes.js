const express = require('express');
const router = express.Router();
const {
  sendNotification,
  getNotificationHistory,
  markAsRead,
  deleteNotification,
  broadcastNotification
} = require('./notification.controller');

router.post('/send', sendNotification);
router.post('/broadcast', broadcastNotification);
router.get('/history/:userId', getNotificationHistory);
router.patch('/:id/read', markAsRead);
router.delete('/:id', deleteNotification);

module.exports = router;