const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    subscription: { type: mongoose.Schema.Types.ObjectId, ref: "Subscription", required: true },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "success", "failed", "refunded"],
      default: "pending",
    },
    method: { type: String, enum: ["card", "upi", "netbanking", "wallet"], default: "card" },
    transactionId: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);