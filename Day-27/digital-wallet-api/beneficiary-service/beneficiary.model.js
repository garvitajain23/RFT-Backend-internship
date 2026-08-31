const mongoose = require('mongoose');

const beneficiarySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    beneficiaryUserId: { type: mongoose.Schema.Types.ObjectId, required: true },
    nickname: { type: String, required: true },
    email: { type: String, required: true }
  },
  { timestamps: true }
);

beneficiarySchema.index({ userId: 1, beneficiaryUserId: 1 }, { unique: true });

module.exports = mongoose.model('Beneficiary', beneficiarySchema);