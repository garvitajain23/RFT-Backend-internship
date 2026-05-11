const express = require("express");
const router = express.Router();
const { validateStudent } = require("./validate.controller");

router.post("/validate", validateStudent);

module.exports = router;
