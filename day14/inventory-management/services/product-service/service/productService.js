const db = require("../../../database/db");

// Get every product from DB
const getAllProducts = () => {
  return db.prepare("SELECT * FROM products").all();
};

// Add a new product
const addProduct = (name, price, quantity) => {
  const stmt = db.prepare(
    "INSERT INTO products (name, price, quantity) VALUES (?, ?, ?)",
  );
  const result = stmt.run(name, price, quantity);
  return db
    .prepare("SELECT * FROM products WHERE id = ?")
    .get(result.lastInsertRowid);
};

// Delete product by ID
const deleteProduct = (id) => {
  const product = db.prepare("SELECT * FROM products WHERE id = ?").get(id);
  if (!product) return null;
  db.prepare("DELETE FROM products WHERE id = ?").run(id);
  return product;
};

module.exports = { getAllProducts, addProduct, deleteProduct };
