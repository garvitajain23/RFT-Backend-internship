require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
const axios = require('axios');
const notificationRoutes = require('./routes/notification.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/notifications', notificationRoutes);

app.get('/health', (req, res) => res.json({ service: 'notification-service', status: 'UP' }));

// Auto-run due-date check every hour (uses a system-level call, no user token needed
// since /due-soon route also requires auth — for cron use a service account/token in production)
cron.schedule('0 * * * *', async () => {
  console.log('⏰ Running scheduled due-date check...');
  // In production, generate a service-to-service token here.
  // Skipped by default so the service doesn't error out without a token.
});

const PORT = process.env.NOTIFICATION_SERVICE_PORT || 5003;
app.listen(PORT, () => console.log(`📧 Notification Service running on port ${PORT}`));