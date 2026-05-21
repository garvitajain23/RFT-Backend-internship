const express = require("express");
const router = express.Router();
const controller = require("../controller/inventoryController");

router.patch("/:id/quantity", controller.updateQuantity); // PATCH /inventory/5/quantity
router.get("/low-stock", controller.getLowStock); // GET  /inventory/low-stock

module.exports = router;
