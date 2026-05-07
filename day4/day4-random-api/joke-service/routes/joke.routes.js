const express = require('express');
const router = express.Router();
const { getRandomJoke } = require('../controllers/joke.controller');

router.get('/joke', getRandomJoke);

module.exports = router;
