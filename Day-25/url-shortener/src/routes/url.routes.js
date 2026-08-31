const express = require('express');
const router = express.Router();
const urlController = require('../controllers/url.controller');
const limiter = require('../middlewares/rateLimiter');

router.post('/shorten', limiter, urlController.shortenUrl);
router.get('/analytics/:shortId', urlController.getAnalytics);
router.get('/qrcode/:shortId', urlController.getQRCode);
router.delete('/cleanup/expired', urlController.cleanupExpired);
router.delete('/:shortId', urlController.deleteUrl);
router.get('/:shortId', limiter, urlController.redirectUrl); // keep this LAST — catch-all

module.exports = router;