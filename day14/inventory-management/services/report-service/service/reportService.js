const db = require("../../../database/db");

const getProductsSortedByPrice = (order = "ASC") => {
  const safeOrder = order.toUpperCase() === "DESC" ? "DESC" : "ASC";
  return db.prepare(`SELECT * FROM products ORDER BY price ${safeOrder}`).all();
};

const getSummary = () => {
  const total = db.prepare("SELECT COUNT(*) as total FROM products").get();
  const totalValue = db
    .prepare("SELECT SUM(price * quantity) as value FROM products")
    .get();
  const avgPrice = db.prepare("SELECT AVG(price) as avg FROM products").get();
  return {
    totalProducts: total.total,
    totalInventoryValue: totalValue.value || 0,
    averagePrice: avgPrice.avg ? parseFloat(avgPrice.avg.toFixed(2)) : 0,
  };
};

module.exports = { getProductsSortedByPrice, getSummary };
