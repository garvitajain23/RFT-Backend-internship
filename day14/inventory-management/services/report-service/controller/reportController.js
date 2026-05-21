const reportService = require("../service/reportService");

const getSortedByPrice = (req, res) => {
  try {
    // ?order=asc or ?order=desc
    const order = req.query.order || "ASC";
    const products = reportService.getProductsSortedByPrice(order);
    res.json({
      success: true,
      sortedBy: `price ${order.toUpperCase()}`,
      data: products,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getSummary = (req, res) => {
  try {
    const summary = reportService.getSummary();
    res.json({ success: true, data: summary });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getSortedByPrice, getSummary };
