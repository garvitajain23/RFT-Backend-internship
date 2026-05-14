const express = require("express");
const router = express.Router();
const { submitUser } = require("../controllers/userController");

// POST /api/user/submit
router.post("/submit", submitUser);

module.exports = router;
