require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.GATEWAY_PORT || 7000;
const TASKS_URL = process.env.TASKS_SERVICE_URL || "http://localhost:7001";

app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({ message: "API Gateway running 🚀", port: PORT });
});

// Forward ALL /tasks requests to Tasks Service
app.all("/tasks{*path}", async (req, res) => {
  try {
    const url = `${TASKS_URL}${req.originalUrl}`;

    const response = await axios({
      method: req.method,
      url: url,
      data: req.body,
      headers: { "Content-Type": "application/json" },
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res
        .status(500)
        .json({ success: false, message: "Gateway error: " + error.message });
    }
  }
});

app.listen(PORT, () => {
  console.log(`🌐 API Gateway running on http://localhost:${PORT}`);
});
