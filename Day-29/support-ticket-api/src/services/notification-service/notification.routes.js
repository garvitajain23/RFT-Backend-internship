const express = require('express');
const router = express.Router();

const { testNotification } = require('./notification.controller');
const { protect, authorize } = require('../auth-service/auth.middleware');
const validate = require('../../middlewares/validate.middleware');
const { ROLES } = require('../../config/constants');

router.post('/test', protect, authorize(ROLES.ADMIN), validate(['to', 'subject', 'message']), testNotification);

module.exports = router;