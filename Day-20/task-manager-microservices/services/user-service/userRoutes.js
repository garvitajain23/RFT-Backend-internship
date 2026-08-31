const express = require("express");
const router = express.Router();
const auth = require("../../shared/authMiddleware"); // ← from shared
const { getProfile, updateProfile, getAllUsers } = require("./userController");

router.use(auth);

router.get("/",        getAllUsers);
router.get("/profile", getProfile);
router.put("/profile", updateProfile);

module.exports = router;