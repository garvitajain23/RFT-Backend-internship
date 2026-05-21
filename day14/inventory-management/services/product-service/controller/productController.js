const productService = require("../service/productService");

const getAllProducts = (req, res) => {
  try {
    const products = productService.getAllProducts();
    res.json({ success: true, count: products.length, data: products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const addProduct = (req, res) => {
  try {
    const { name, price, quantity } = req.body;

    // Validate input
    if (!name || price === undefined || quantity === undefined) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, price, and quantity",
      });
    }
    if (price < 0 || quantity < 0) {
      return res.status(400).json({
        success: false,
        message: "Price and quantity cannot be negative",
      });
    }

    const product = productService.addProduct(name, price, quantity);
    res
      .status(201)
      .json({ success: true, message: "Product added!", data: product });
  } catch (err) {
    // SQLite UNIQUE constraint error
    if (err.message.includes("UNIQUE")) {
      return res
        .status(409)
        .json({ success: false, message: "Product name already exists" });
    }
    res.status(500).json({ success: false, message: err.message });
  }
};

const deleteProduct = (req, res) => {
  try {
    const { id } = req.params;
    const deleted = productService.deleteProduct(id);
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.json({ success: true, message: "Product deleted", data: deleted });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getAllProducts, addProduct, deleteProduct };
