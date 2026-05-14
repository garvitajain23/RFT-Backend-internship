const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 9000;
const USER_SERVICE_URL = process.env.USER_SERVICE_URL;

// ── Forward POST /api/user/submit → User Service ──────────────────────────────
app.post("/api/user/submit", async (req, res) => {
  try {
    const response = await axios.post(
      `${USER_SERVICE_URL}/api/user/submit`,
      req.body, // forward the parsed body directly
      { headers: { "Content-Type": "application/json" } },
    );
    return res.status(response.status).json(response.data);
  } catch (err) {
    // axios throws on 4xx/5xx — extract and forward the real error response
    if (err.response) {
      return res.status(err.response.status).json(err.response.data);
    }
    return res.status(502).json({
      success: false,
      error: "User service is currently unavailable",
    });
  }
});

// ── Health checks ─────────────────────────────────────────────────────────────
app.get("/health", (req, res) => {
  res.json({ status: "API Gateway running", port: PORT });
});

// ── Forward health check to user service too ──────────────────────────────────
app.get("/api/user/health", async (req, res) => {
  try {
    const response = await axios.get(`${USER_SERVICE_URL}/health`);
    return res.status(200).json(response.data);
  } catch (err) {
    return res.status(502).json({ error: "User service unreachable" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 API Gateway running on http://localhost:${PORT}`);
});
