const express = require("express");
const router = express.Router();
const { getAllUsers, getUserById } = require("../controller/user.controller");

router.get("/", getAllUsers); // GET /users
router.get("/:id", getUserById); // GET /users/:id

module.exports = router;
