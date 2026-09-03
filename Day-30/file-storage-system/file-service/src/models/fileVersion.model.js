const mongoose = require('mongoose');

const fileVersionSchema = new mongoose.Schema({
  file: { type: mongoose.Schema.Types.ObjectId, ref: 'File', required: true },
  versionNumber: { type: Number, required: true },
  storedName: { type: String, required: true },
  path: { type: String, required: true },
  size: { type: Number, required: true },
  uploadedBy: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('FileVersion', fileVersionSchema);