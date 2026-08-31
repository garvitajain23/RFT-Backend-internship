const express = require("express");
const router = express.Router();
const { register, login, getProfile, getAllUsers } = require("./auth.controller");
const verifyToken = require("./verifyToken");
const checkRole = require("./checkRole");

router.post("/register", register);
router.post("/login", login);
router.get("/me", verifyToken, getProfile);
router.get("/users", verifyToken, checkRole("admin"), getAllUsers);

module.exports = router;