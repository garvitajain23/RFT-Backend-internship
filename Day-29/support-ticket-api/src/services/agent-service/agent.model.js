const mongoose = require('mongoose');

// Agent-specific profile — linked 1:1 with a User (role: 'agent')
const agentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    department: { type: String, default: 'General' },
    isAvailable: { type: Boolean, default: true },
    maxActiveTickets: { type: Number, default: 10 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Agent', agentSchema);