const express = require("express");
const router = express.Router();
const { search } = require("./post.controller");

router.get("/search", search);

module.exports = router;
