const express = require("express");
const router = express.Router();
const { getRandom, getAll } = require("../controllers/quote.controller");

router.get("/", getRandom);
router.get("/all", getAll);

module.exports = router;
