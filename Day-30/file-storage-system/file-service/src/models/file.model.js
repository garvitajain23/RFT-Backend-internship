const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  originalName: { type: String, required: true },
  storedName: { type: String, required: true },
  path: { type: String, required: true },
  mimeType: { type: String, required: true },
  size: { type: Number, required: true },
  owner: { type: String, required: true, index: true },
  folder: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder', default: null },
  currentVersion: { type: Number, default: 1 },
  sharedWith: [{
    user: { type: String },
    permission: { type: String, enum: ['view', 'edit'], default: 'view' }
  }],
  isPublic: { type: Boolean, default: false },
  tags: [{ type: String }]
}, { timestamps: true });

fileSchema.index({ originalName: 'text', tags: 'text' });

module.exports = mongoose.model('File', fileSchema);