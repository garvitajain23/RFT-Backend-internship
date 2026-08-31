const express = require("express");
const router = express.Router();
const { createBooking, cancel, history } = require("./booking.controller");

router.post("/", createBooking);            // Book tickets
router.put("/:id/cancel", cancel);          // Cancel booking
router.get("/history/:email", history);     // View booking history

module.exports = router;