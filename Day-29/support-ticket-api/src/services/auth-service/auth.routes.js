const express = require('express');
const router = express.Router();

const { register, login } = require('./auth.controller');
const validate = require('../../middlewares/validate.middleware');

router.post('/register', validate(['name', 'email', 'password']), register);
router.post('/login', validate(['email', 'password']), login);

module.exports = router;