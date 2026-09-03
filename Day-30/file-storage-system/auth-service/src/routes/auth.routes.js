const express = require('express');
const router = express.Router();
const { register, login, getProfile } = require('../controllers/auth.controller');
const jwt = require('jsonwebtoken');

// Minimal inline auth check for /me
const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }
  try {
    const token = authHeader.split(' ')[1];
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getProfile);

module.exports = router;