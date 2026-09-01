const express = require('express');
const router = express.Router();

const { createAgent, getAgents, getAgent, setAvailability } = require('./agent.controller');
const { protect, authorize } = require('../auth-service/auth.middleware');
const validate = require('../../middlewares/validate.middleware');
const { ROLES } = require('../../config/constants');

router.post('/', protect, authorize(ROLES.ADMIN), validate(['userId']), createAgent);
router.get('/', protect, authorize(ROLES.ADMIN, ROLES.AGENT), getAgents);
router.get('/:id', protect, authorize(ROLES.ADMIN, ROLES.AGENT), getAgent);
router.patch('/:id/availability', protect, authorize(ROLES.ADMIN, ROLES.AGENT), setAvailability);

module.exports = router;