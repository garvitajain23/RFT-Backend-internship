const express = require("express");
const router = express.Router();
const { performCalculation } = require("../controllers/calc.controller");

router.get("/", performCalculation);

module.exports = router;
