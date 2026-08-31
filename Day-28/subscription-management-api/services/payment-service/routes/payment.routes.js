const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/payment.controller");
const { verifyToken } = require("../../../shared/middlewares/verifyToken");

router.post("/", verifyToken, paymentController.createPayment);
router.get("/:id/status", verifyToken, paymentController.getPaymentStatus);
router.get("/history", verifyToken, paymentController.getUserPayments);

module.exports = router;