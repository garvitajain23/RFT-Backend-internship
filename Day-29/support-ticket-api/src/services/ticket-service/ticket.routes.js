const express = require('express');
const router = express.Router();

const {
  createTicket,
  getTickets,
  getTicket,
  assignTicket,
  updateStatus,
  updatePriority,
  closeTicket,
  getHistory,
} = require('./ticket.controller');

const { protect, authorize } = require('../auth-service/auth.middleware');
const validate = require('../../middlewares/validate.middleware');
const { ROLES } = require('../../config/constants');

router.post('/', protect, validate(['title', 'description']), createTicket);
router.get('/', protect, getTickets);
router.get('/:id', protect, getTicket);
router.get('/:id/history', protect, getHistory);

router.patch('/:id/assign', protect, authorize(ROLES.ADMIN, ROLES.AGENT), validate(['agentId']), assignTicket);
router.patch('/:id/status', protect, authorize(ROLES.ADMIN, ROLES.AGENT), validate(['status']), updateStatus);
router.patch('/:id/priority', protect, authorize(ROLES.ADMIN, ROLES.AGENT), validate(['priority']), updatePriority);
router.patch('/:id/close', protect, authorize(ROLES.ADMIN, ROLES.AGENT), closeTicket);

module.exports = router;