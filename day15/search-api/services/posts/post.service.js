const pool = require("../../db");

const searchPosts = async ({ title, author }) => {
  let query = "SELECT * FROM posts WHERE 1=1";
  const values = [];

  if (title) {
    values.push(`%${title}%`);
    query += ` AND title ILIKE $${values.length}`;
  }

  if (author) {
    values.push(`%${author}%`);
    query += ` AND author ILIKE $${values.length}`;
  }

  const result = await pool.query(query, values);
  return result.rows;
};

module.exports = { searchPosts };
