require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
const connectDB = require('../config/db');
const notificationRoutes = require('./notification.routes');
const { processScheduledNotifications } = require('./notification.controller');

const app = express();
app.use(cors());
app.use(express.json());

connectDB('Notification-Core-Service');

app.use('/api/notifications', notificationRoutes);

// Cron task running every minute to process scheduled notifications
cron.schedule('* * * * *', () => {
  processScheduledNotifications();
});

const PORT = process.env.NOTIFICATION_SERVICE_PORT || 5001;
app.listen(PORT, () => {
  console.log(`🔔 Notification Core Service running on port ${PORT}`);
});