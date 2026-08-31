module.exports = {
  BASE_URL: process.env.BASE_URL || 'http://localhost:5000',
  SHORT_ID_LENGTH: 7,
  DEFAULT_EXPIRY_DAYS: 30,
  RATE_LIMIT_WINDOW_MS: 15 * 60 * 1000, // 15 minutes
  RATE_LIMIT_MAX: 100,
};