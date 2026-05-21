const db = require("../../../database/db");

const updateQuantity = (id, quantity) => {
  const product = db.prepare("SELECT * FROM products WHERE id = ?").get(id);
  if (!product) return null;
  db.prepare("UPDATE products SET quantity = ? WHERE id = ?").run(quantity, id);
  return db.prepare("SELECT * FROM products WHERE id = ?").get(id);
};

const getLowStockProducts = (threshold) => {
  return db
    .prepare("SELECT * FROM products WHERE quantity <= ?")
    .all(threshold);
};

module.exports = { updateQuantity, getLowStockProducts };
