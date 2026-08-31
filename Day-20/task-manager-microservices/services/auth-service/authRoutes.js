const express = require("express");
const router = express.Router();
const { register, login, verifyToken } = require("./authController");
const { registerRules, loginRules, validate } = require("./validateMiddleware");

// ✅ Spread the array with ...
router.post("/register", ...registerRules, validate, register);
router.post("/login",    ...loginRules,    validate, login);
router.post("/verify",   verifyToken);

module.exports = router;