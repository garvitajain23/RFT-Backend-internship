const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");

// POST  /api/orders              → place order
// GET   /api/orders/user/:userId → order history per user
// GET   /api/orders/:orderId     → single order
// PATCH /api/orders/:orderId     → update status

router.post("/", orderController.placeOrder);
router.get("/user/:userId", orderController.getOrdersByUser);
router.get("/:orderId", orderController.getOrderById);
router.patch("/:orderId", orderController.updateOrderStatus);

module.exports = router;
