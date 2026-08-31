const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notification.controller");
const { verifyToken, isAdmin } = require("../../../shared/middlewares/verifyToken");

router.post("/check-expiry", verifyToken, isAdmin, notificationController.triggerExpiryCheck);
router.post("/send", verifyToken, isAdmin, notificationController.sendCustom);

module.exports = router;