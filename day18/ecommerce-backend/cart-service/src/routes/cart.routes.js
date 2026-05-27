const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart.controller");

// GET    /api/cart/:userId             → view cart
// POST   /api/cart                     → add to cart
// DELETE /api/cart/:userId/:productId  → remove item
// DELETE /api/cart/:userId/clear       → clear cart

router.get("/:userId", cartController.getCart);
router.post("/", cartController.addToCart);
router.delete("/:userId/:productId", cartController.removeFromCart);
router.delete("/:userId/clear", cartController.clearCart);

module.exports = router;
