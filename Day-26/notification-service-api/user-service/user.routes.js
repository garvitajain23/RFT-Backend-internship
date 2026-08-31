const express = require('express');
const router = express.Router();
const {
  registerUser,
  getUserById,
  getAllUsers,
  updatePreferences
} = require('./user.controller');

router.post('/register', registerUser);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id/preferences', updatePreferences);

module.exports = router;