const { searchPosts } = require("./post.service");

const search = async (req, res) => {
  try {
    const { title, author } = req.query;
    const results = await searchPosts({ title, author });
    res.json({ service: "posts", count: results.length, data: results });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { search };
