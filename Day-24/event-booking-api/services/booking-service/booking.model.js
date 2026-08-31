const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    seats: { type: Number, required: true },
    status: { type: String, enum: ["CONFIRMED", "CANCELLED"], default: "CONFIRMED" },
    qrCode: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);