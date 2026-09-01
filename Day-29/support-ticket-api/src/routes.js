const express = require('express');
const router = express.Router();

const authRoutes = require('./services/auth-service/auth.routes');
const ticketRoutes = require('./services/ticket-service/ticket.routes');
const agentRoutes = require('./services/agent-service/agent.routes');
const notificationRoutes = require('./services/notification-service/notification.routes');
const analyticsRoutes = require('./services/analytics-service/analytics.routes');

router.use('/auth', authRoutes);
router.use('/tickets', ticketRoutes);
router.use('/agents', agentRoutes);
router.use('/notifications', notificationRoutes);
router.use('/analytics', analyticsRoutes);

module.exports = router;