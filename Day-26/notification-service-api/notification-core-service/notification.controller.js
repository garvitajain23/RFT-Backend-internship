const Notification = require('./notification.model');
const axios = require('axios');

exports.sendNotification = async (req, res) => {
  try {
    const { userId, title, message, channel = 'IN_APP', scheduledAt } = req.body;

    const userRes = await axios.get(`${process.env.USER_SERVICE_URL}/${userId}`);
    const user = userRes.data.data;

    if (scheduledAt && new Date(scheduledAt) > new Date()) {
      const scheduledNotification = await Notification.create({
        userId,
        title,
        message,
        channel,
        status: 'SCHEDULED',
        scheduledAt: new Date(scheduledAt)
      });
      return res.status(201).json({ success: true, message: 'Notification scheduled', data: scheduledNotification });
    }

    if (channel === 'PUSH' && !user.preferences.pushEnabled) {
      return res.status(403).json({ success: false, message: 'User has disabled Push notifications' });
    }
    if (channel === 'IN_APP' && !user.preferences.inAppEnabled) {
      return res.status(403).json({ success: false, message: 'User has disabled In-App notifications' });
    }

    if (channel === 'PUSH' && user.deviceToken) {
      await axios.post(`${process.env.PUSH_SERVICE_URL}/send`, {
        deviceToken: user.deviceToken,
        title,
        body: message
      });
    }

    const notification = await Notification.create({
      userId,
      title,
      message,
      channel,
      status: 'SENT'
    });

    res.status(201).json({ success: true, data: notification });
  } catch (error) {
    res.status(500).json({ success: false, error: error.response?.data?.message || error.message });
  }
};

exports.getNotificationHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: notifications.length, data: notifications });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    if (!notification) return res.status(404).json({ success: false, message: 'Notification not found' });
    res.status(200).json({ success: true, message: 'Notification marked as read', data: notification });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);
    if (!notification) return res.status(404).json({ success: false, message: 'Notification not found' });
    res.status(200).json({ success: true, message: 'Notification deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.broadcastNotification = async (req, res) => {
  try {
    const { title, message, channel = 'IN_APP' } = req.body;

    const usersRes = await axios.get(`${process.env.USER_SERVICE_URL}`);
    const users = usersRes.data.data;

    const notificationsToInsert = [];

    for (const user of users) {
      if (channel === 'IN_APP' && user.preferences.inAppEnabled) {
        notificationsToInsert.push({ userId: user._id, title, message, channel: 'IN_APP', status: 'SENT' });
      }
    }

    if (notificationsToInsert.length > 0) {
      await Notification.insertMany(notificationsToInsert);
    }

    res.status(200).json({
      success: true,
      message: `Broadcast delivered to ${notificationsToInsert.length} eligible users`
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.processScheduledNotifications = async () => {
  try {
    const now = new Date();
    const pendingNotifications = await Notification.find({
      status: 'SCHEDULED',
      scheduledAt: { $lte: now }
    });

    for (const notification of pendingNotifications) {
      notification.status = 'SENT';
      await notification.save();
      console.log(`[Scheduler] Dispatched scheduled notification ${notification._id}`);
    }
  } catch (error) {
    console.error('[Scheduler Error]:', error.message);
  }
};