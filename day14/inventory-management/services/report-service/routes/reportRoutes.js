const express = require("express");
const router = express.Router();
const controller = require("../controller/reportController");

router.get("/sort-by-price", controller.getSortedByPrice); // GET /reports/sort-by-price?order=desc
router.get("/summary", controller.getSummary); // GET /reports/summary

module.exports = router;
