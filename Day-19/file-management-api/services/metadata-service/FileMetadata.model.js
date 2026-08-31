const mongoose = require('mongoose');

const fileMetadataSchema = new mongoose.Schema(
  {
    originalName: { type: String, required: true },
    storedName:   { type: String, required: true, unique: true },
    mimeType:     { type: String, required: true },
    size:         { type: Number, required: true },
    path:         { type: String, required: true },
    isDeleted:    { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('FileMetadata', fileMetadataSchema);