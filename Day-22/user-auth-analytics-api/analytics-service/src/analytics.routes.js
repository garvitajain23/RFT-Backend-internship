const express = require("express");
const router = express.Router();
const verifyToken = require("./verifyToken");
const { logActivity, getActivities, getStats } = require("./analytics.controller");

router.post("/log", logActivity);                      // internal call from gateway
router.get("/", verifyToken, getActivities);            // pagination + search
router.get("/stats", verifyToken, getStats);            // usage statistics

module.exports = router;