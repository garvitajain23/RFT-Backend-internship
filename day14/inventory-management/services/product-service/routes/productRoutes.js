const express = require("express");
const router = express.Router();
const controller = require("../controller/productController");

router.get("/", controller.getAllProducts); // GET  /products
router.post("/", controller.addProduct); // POST /products
router.delete("/:id", controller.deleteProduct); // DELETE /products/5

module.exports = router;
