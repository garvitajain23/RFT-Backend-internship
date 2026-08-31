const mongoose = require("mongoose");

const planSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    price: { type: Number, required: true },
    billingCycle: { type: String, enum: ["monthly", "yearly"], default: "monthly" },
    features: [{ type: String }],
    durationInDays: { type: Number, required: true, default: 30 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Plan", planSchema);