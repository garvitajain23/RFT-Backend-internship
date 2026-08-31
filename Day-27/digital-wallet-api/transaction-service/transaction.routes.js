const express = require('express');
const router = express.Router();
const { sendMoney, getHistory, getAnalytics } = require('./transaction.controller');
const { verifyPin } = require('../middleware/pinMiddleware');

router.post('/send', verifyPin, sendMoney); // PIN verified before money moves
router.get('/history/:userId', getHistory);
router.get('/analytics/:userId', getAnalytics);

module.exports = router;