const pool = require("../../db");

const searchProducts = async ({ name, category }) => {
  let query = "SELECT * FROM products WHERE 1=1";
  const values = [];

  if (name) {
    values.push(`%${name}%`);
    query += ` AND name ILIKE $${values.length}`;
  }

  if (category) {
    values.push(`%${category}%`);
    query += ` AND category ILIKE $${values.length}`;
  }

  const result = await pool.query(query, values);
  return result.rows;
};

module.exports = { searchProducts };
