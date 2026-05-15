const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 2000;

app.use(express.json());

const NOTES_SERVICE = process.env.NOTES_SERVICE_URL || "http://localhost:2001";

// ✅ Express 5 wildcard syntax: /notes/:path*  replaced with app.use
app.use("/notes", async (req, res) => {
  try {
    const url = `${NOTES_SERVICE}/notes${req.path === "/" ? "" : req.path}`;

    const response = await axios({
      method: req.method,
      url: url,
      data: req.body,
      params: req.query,
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ error: "Gateway error: " + error.message });
    }
  }
});

app.get("/", (req, res) => {
  res.json({ message: "API Gateway running on port " + PORT });
});

app.listen(PORT, () => {
  console.log(`🚀 API Gateway running on http://localhost:${PORT}`);
});
