const mongoose = require('mongoose');

const downloadLogSchema = new mongoose.Schema({
  file: { type: mongoose.Schema.Types.ObjectId, ref: 'File', required: true },
  downloadedBy: { type: String, required: true },
  ipAddress: { type: String },
  downloadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('DownloadLog', downloadLogSchema);