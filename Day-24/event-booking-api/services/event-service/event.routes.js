const express = require("express");
const router = express.Router();
const { registerEvent, listEvents, getAvailability } = require("./event.controller");

router.post("/", registerEvent);          // Register event
router.get("/", listEvents);              // List all events
router.get("/:id/availability", getAvailability); // Check seat availability

module.exports = router;