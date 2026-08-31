const express = require('express');
const router  = express.Router();
const axios   = require('axios');
const path    = require('path');
const fs      = require('fs');

const METADATA_URL = process.env.METADATA_SERVICE_URL;
const UPLOADS_PATH = process.env.UPLOADS_PATH;

// GET /files — list all files
router.get('/', async (req, res) => {
  try {
    const response = await axios.get(`${METADATA_URL}/metadata`);
    res.json({ data: response.data.data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /files/:filename — retrieve/download file
router.get('/:filename', async (req, res) => {
  try {
    const { filename } = req.params;

    // Check metadata first
    await axios.get(`${METADATA_URL}/metadata/${filename}`);

    const filePath = path.resolve(UPLOADS_PATH, filename);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found on disk' });
    }

    res.sendFile(filePath);
  } catch (err) {
    if (err.response?.status === 404) {
      return res.status(404).json({ error: 'File not found' });
    }
    res.status(500).json({ error: err.message });
  }
});

// DELETE /files/:filename — delete file from disk + metadata
router.delete('/:filename', async (req, res) => {
  try {
    const { filename } = req.params;

    // Delete from disk
    const filePath = path.resolve(UPLOADS_PATH, filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Soft delete in metadata-service
    const response = await axios.delete(`${METADATA_URL}/metadata/${filename}`);

    res.json({ message: 'File deleted successfully', data: response.data });
  } catch (err) {
    if (err.response?.status === 404) {
      return res.status(404).json({ error: 'File not found' });
    }
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;