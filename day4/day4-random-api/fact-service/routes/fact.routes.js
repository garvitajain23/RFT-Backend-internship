const express = require('express');
const router = express.Router();
const { getRandomFact } = require('../controllers/fact.controller');

router.get('/fact', getRandomFact);

module.exports = router;
