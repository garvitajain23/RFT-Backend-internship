require("dotenv").config();
const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const USER_SERVICE = process.env.USER_SERVICE_URL || "http://localhost:4001";

// GET /users → get all users
app.get("/users", async (req, res) => {
  try {
    const response = await axios.get(`${USER_SERVICE}/users`);
    res.status(200).json(response.data);
  } catch (err) {
    res.status(502).json({
      success: false,
      error: "User Service unavailable",
    });
  }
});

// GET /users/:id → get specific user
app.get("/users/:id", async (req, res) => {
  try {
    const response = await axios.get(`${USER_SERVICE}/users/${req.params.id}`);
    res.status(200).json(response.data);
  } catch (err) {
    res.status(err.response?.status || 502).json({
      success: false,
      error: err.response?.data?.error || "User not found",
    });
  }
});

// Gateway health check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    service: "api-gateway",
    PORT: 8000,
    userService: USER_SERVICE,
  });
});

// 404 for unknown routes
app.use((req, res) => {
  res.status(404).json({ success: false, error: "Route not found" });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚪 API Gateway running on http://localhost:${PORT}`);
  console.log(`   /users → ${USER_SERVICE}`);
});
