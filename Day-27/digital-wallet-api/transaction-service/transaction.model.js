const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
  {
    senderId: { type: mongoose.Schema.Types.ObjectId, required: true },
    receiverId: { type: mongoose.Schema.Types.ObjectId, required: true },
    amount: { type: Number, required: true },
    type: { type: String, enum: ['transfer'], default: 'transfer' },
    status: { type: String, enum: ['success', 'failed'], default: 'success' },
    note: { type: String, default: '' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Transaction', transactionSchema);