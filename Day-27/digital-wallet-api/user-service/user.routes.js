const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  setTransactionPin,
  verifyTransactionPin,
  getUserById
} = require('./user.controller');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/set-pin', setTransactionPin);
router.post('/verify-pin', verifyTransactionPin);
router.get('/:id', getUserById);

module.exports = router;