const urlService = require('../services/url.service');
const generateQRCode = require('../utils/qrGenerator');

exports.shortenUrl = async (req, res, next) => {
  try {
    const { originalUrl, customAlias, expiryDays } = req.body;

    if (!originalUrl) {
      return res.status(400).json({ success: false, message: 'originalUrl is required' });
    }

    const result = await urlService.createShortUrl(originalUrl, customAlias, expiryDays);
    res.status(201).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

exports.redirectUrl = async (req, res, next) => {
  try {
    const { shortId } = req.params;
    const originalUrl = await urlService.getOriginalUrl(shortId);
    res.redirect(originalUrl);
  } catch (err) {
    next(err);
  }
};

exports.getAnalytics = async (req, res, next) => {
  try {
    const { shortId } = req.params;
    const analytics = await urlService.getAnalytics(shortId);
    res.status(200).json({ success: true, data: analytics });
  } catch (err) {
    next(err);
  }
};

exports.getQRCode = async (req, res, next) => {
  try {
    const { shortId } = req.params;
    const { BASE_URL } = require('../config/constants');
    const qr = await generateQRCode(`${BASE_URL}/${shortId}`);
    res.status(200).json({ success: true, qrCode: qr });
  } catch (err) {
    next(err);
  }
};

exports.deleteUrl = async (req, res, next) => {
  try {
    const { shortId } = req.params;
    await urlService.deleteUrl(shortId);
    res.status(200).json({ success: true, message: 'URL deleted' });
  } catch (err) {
    next(err);
  }
};

exports.cleanupExpired = async (req, res, next) => {
  try {
    const count = await urlService.deleteExpiredUrls();
    res.status(200).json({ success: true, message: `${count} expired URLs deleted` });
  } catch (err) {
    next(err);
  }
};