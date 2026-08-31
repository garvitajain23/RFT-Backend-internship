const express = require("express");
const router = express.Router();
const subscriptionController = require("../controllers/subscription.controller");
const { verifyToken } = require("../../../shared/middlewares/verifyToken");

router.post("/subscribe", verifyToken, subscriptionController.subscribe);
router.put("/change-plan", verifyToken, subscriptionController.changePlan);
router.get("/history", verifyToken, subscriptionController.getHistory);
router.get("/active", verifyToken, subscriptionController.getActive);
router.put("/cancel", verifyToken, subscriptionController.cancel);

module.exports = router;