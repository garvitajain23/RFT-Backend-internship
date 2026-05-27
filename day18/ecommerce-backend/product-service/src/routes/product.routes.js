const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");

// GET    /api/products         → get all products
// GET    /api/products/:id     → get one product
// POST   /api/products         → create product
// PATCH  /api/products/:id/stock → update stock
// DELETE /api/products/:id     → delete product

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.post("/", productController.createProduct);
router.patch("/:id/stock", productController.updateStock);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
