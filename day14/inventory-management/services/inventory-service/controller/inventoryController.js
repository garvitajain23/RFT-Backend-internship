const inventoryService = require("../service/inventoryService");

const updateQuantity = (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (quantity === undefined || quantity < 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid quantity (0 or more)",
      });
    }

    const updated = inventoryService.updateQuantity(id, quantity);
    if (!updated) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.json({ success: true, message: "Quantity updated!", data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getLowStock = (req, res) => {
  try {
    const threshold = parseInt(process.env.LOW_STOCK_THRESHOLD) || 5;
    const products = inventoryService.getLowStockProducts(threshold);
    res.json({
      success: true,
      message: `Products with quantity ≤ ${threshold}`,
      count: products.length,
      data: products,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { updateQuantity, getLowStock };
