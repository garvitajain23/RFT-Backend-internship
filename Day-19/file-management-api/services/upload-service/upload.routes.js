const express = require('express');
const router  = express.Router();
const axios   = require('axios');
const fs      = require('fs');
const { upload, handleMulterError } = require('./fileValidator');

const METADATA_URL = process.env.METADATA_SERVICE_URL;

// POST /upload
router.post('/', upload.single('file'), handleMulterError, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    const { originalname, filename, mimetype, size, path } = req.file;

    // Save metadata in metadata-service
    const metaRes = await axios.post(`${METADATA_URL}/metadata`, {
      originalName: originalname,
      storedName:   filename,
      mimeType:     mimetype,
      size,
      path,
    });

    res.status(201).json({
      message: 'File uploaded successfully',
      file: {
        storedName:   filename,
        originalName: originalname,
        size,
        mimeType:     mimetype,
      },
      metadata: metaRes.data.data,
    });
  } catch (err) {
    // Cleanup file from disk if metadata save failed
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ error: 'Upload failed: ' + err.message });
  }
});

module.exports = router;