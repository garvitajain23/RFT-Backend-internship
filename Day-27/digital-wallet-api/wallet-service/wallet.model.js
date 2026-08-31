const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
    balance: { type: Number, default: 0 },
    dailyLimit: { type: Number, default: process.env.DAILY_TRANSACTION_LIMIT || 50000 },
    dailyUsed: { type: Number, default: 0 },
    lastResetDate: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Wallet', walletSchema);