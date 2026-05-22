require("dotenv").config();
const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const SERVICES = {
  products: `http://localhost:${process.env.PRODUCTS_PORT}`,
  users: `http://localhost:${process.env.USERS_PORT}`,
  posts: `http://localhost:${process.env.POSTS_PORT}`,
};

// Route: /search?name=phone&service=products
// Route: /search?name=alice&service=users
// Route: /search?title=hello&service=posts

app.get("/search", async (req, res) => {
  const { service, ...filters } = req.query;

  if (!service || !SERVICES[service]) {
    return res.status(400).json({
      error:
        'Please provide a valid "service" query param: products | users | posts',
    });
  }

  try {
    const response = await axios.get(`${SERVICES[service]}/${service}/search`, {
      params: filters,
    });
    res.json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Service unavailable", details: error.message });
  }
});

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "Gateway is running", port: process.env.GATEWAY_PORT });
});

const PORT = process.env.GATEWAY_PORT || 2000;
app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));
