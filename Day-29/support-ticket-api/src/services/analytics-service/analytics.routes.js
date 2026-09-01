const express = require('express');
const router = express.Router();

const { getSummary } = require('./analytics.controller');
const { protect, authorize } = require('../auth-service/auth.middleware');
const { ROLES } = require('../../config/constants');

router.get('/summary', protect, authorize(ROLES.ADMIN, ROLES.AGENT), getSummary);

module.exports = router;