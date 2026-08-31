const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    venue: { type: String, required: true },
    date: { type: Date, required: true },
    totalSeats: { type: Number, required: true },
    availableSeats: { type: Number, required: true },
    price: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);