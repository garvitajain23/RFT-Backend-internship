const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, index: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    channel: {
      type: String,
      enum: ['IN_APP', 'PUSH'],
      default: 'IN_APP'
    },
    status: {
      type: String,
      enum: ['SENT', 'SCHEDULED', 'FAILED'],
      default: 'SENT'
    },
    isRead: { type: Boolean, default: false },
    scheduledAt: { type: Date, default: null }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Notification', notificationSchema);