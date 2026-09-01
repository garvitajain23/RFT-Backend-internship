const mongoose = require('mongoose');
const { TICKET_STATUS, TICKET_PRIORITY } = require('../../config/constants');

const historyEntrySchema = new mongoose.Schema(
  {
    action: { type: String, required: true }, // e.g. "status_changed", "assigned", "priority_changed"
    detail: { type: String },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const ticketSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    assignedAgent: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent', default: null },
    status: {
      type: String,
      enum: Object.values(TICKET_STATUS),
      default: TICKET_STATUS.OPEN,
    },
    priority: {
      type: String,
      enum: Object.values(TICKET_PRIORITY),
      default: TICKET_PRIORITY.MEDIUM,
    },
    closedAt: { type: Date, default: null },
    history: [historyEntrySchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Ticket', ticketSchema);