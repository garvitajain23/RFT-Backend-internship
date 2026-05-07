const express = require('express');
const router = express.Router();
const axios = require('axios');

const SERVICES = {
  quote: 'http://localhost:9001/quote',
  joke:  'http://localhost:9002/joke',
  fact:  'http://localhost:9003/fact'
};

router.get('/', (req, res) => {
  res.json({
    message: "Welcome to Random Data API - Day 4",
    author: "GOW AI Academy",
    endpoints: {
      quote: "GET /quote",
      joke:  "GET /joke",
      fact:  "GET /fact"
    }
  });
});

router.get('/quote', async (req, res) => {
  try {
    const response = await axios.get(SERVICES.quote);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(503).json({ success: false, message: "Quote Service unavailable" });
  }
});

router.get('/joke', async (req, res) => {
  try {
    const response = await axios.get(SERVICES.joke);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(503).json({ success: false, message: "Joke Service unavailable" });
  }
});

router.get('/fact', async (req, res) => {
  try {
    const response = await axios.get(SERVICES.fact);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(503).json({ success: false, message: "Fact Service unavailable" });
  }
});

router.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.path} not found`,
    available: ['/quote', '/joke', '/fact']
  });
});

module.exports = router;
