const { searchProducts } = require("./product.service");

const search = async (req, res) => {
  try {
    const { name, category } = req.query;
    const results = await searchProducts({ name, category });
    res.json({ service: "products", count: results.length, data: results });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { search };
