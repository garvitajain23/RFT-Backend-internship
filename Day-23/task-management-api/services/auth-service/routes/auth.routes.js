const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const authenticate = require('../../../shared/middlewares/auth.middleware');
const authorize = require('../../../shared/middlewares/role.middleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', authenticate, authController.getProfile);
router.get('/users', authenticate, authorize('admin', 'manager'), authController.getAllUsers);
router.get('/users/:id', authenticate, authController.getUserById);

module.exports = router;