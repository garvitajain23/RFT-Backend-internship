const express = require("express");
const router = express.Router();
const axios = require("axios");

// Forward all /api/auth/* to auth-service
router.post("/register", async (req, res) => {
  try {
    const { data } = await axios.post(
      `${process.env.AUTH_SERVICE_URL}/api/auth/register`,
      req.body
    );
    res.status(201).json(data);
  } catch (err) {
    res.status(err.response?.status || 500).json(err.response?.data || { message: "Auth service error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { data } = await axios.post(
      `${process.env.AUTH_SERVICE_URL}/api/auth/login`,
      req.body
    );
    res.json(data);
  } catch (err) {
    res.status(err.response?.status || 500).json(err.response?.data || { message: "Auth service error" });
  }
});

module.exports = router;