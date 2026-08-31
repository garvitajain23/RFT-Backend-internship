const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    plan: { type: mongoose.Schema.Types.ObjectId, ref: "Plan", required: true },
    status: {
      type: String,
      enum: ["active", "expired", "cancelled", "upgraded", "downgraded"],
      default: "active",
    },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, required: true },
    autoRenew: { type: Boolean, default: false },
    history: [
      {
        action: { type: String }, // e.g. "subscribed", "upgraded", "downgraded", "cancelled"
        fromPlan: { type: mongoose.Schema.Types.ObjectId, ref: "Plan" },
        toPlan: { type: mongoose.Schema.Types.ObjectId, ref: "Plan" },
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subscription", subscriptionSchema);