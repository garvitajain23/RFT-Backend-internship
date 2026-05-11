const express = require("express");
const router = express.Router();
const { checkDuplicateId } = require("./idguard.controller");

router.post("/check-id", checkDuplicateId);

module.exports = router;
