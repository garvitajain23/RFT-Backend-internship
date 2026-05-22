const { searchUsers } = require("./user.service");

const search = async (req, res) => {
  try {
    const { name, email } = req.query;
    const results = await searchUsers({ name, email });
    res.json({ service: "users", count: results.length, data: results });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { search };
