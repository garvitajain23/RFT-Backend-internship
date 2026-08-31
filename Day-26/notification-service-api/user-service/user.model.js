const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    deviceToken: { type: String, default: null },
    preferences: {
      inAppEnabled: { type: Boolean, default: true },
      pushEnabled: { type: Boolean, default: true }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);