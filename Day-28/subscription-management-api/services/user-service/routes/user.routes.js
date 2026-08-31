const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { verifyToken, isAdmin } = require("../middlewares/auth.middleware");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/profile", verifyToken, userController.getProfile);
router.get("/", verifyToken, isAdmin, userController.getAllUsers);

module.exports = router;