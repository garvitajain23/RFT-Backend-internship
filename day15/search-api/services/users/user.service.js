const pool = require("../../db");

const searchUsers = async ({ name, email }) => {
  let query = "SELECT * FROM users WHERE 1=1";
  const values = [];

  if (name) {
    values.push(`%${name}%`);
    query += ` AND name ILIKE $${values.length}`;
  }

  if (email) {
    values.push(`%${email}%`);
    query += ` AND email ILIKE $${values.length}`;
  }

  const result = await pool.query(query, values);
  return result.rows;
};

module.exports = { searchUsers };
