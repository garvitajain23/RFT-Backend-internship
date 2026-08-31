const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");
const { verifyToken, isAdmin } = require("../../../shared/middlewares/verifyToken");

router.get("/analytics", verifyToken, isAdmin, adminController.getAnalytics);

module.exports = router;