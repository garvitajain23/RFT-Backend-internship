const express = require('express');
const router = express.Router();
const { getRandomQuote } = require('../controllers/quote.controller');

router.get('/quote', getRandomQuote);

module.exports = router;
