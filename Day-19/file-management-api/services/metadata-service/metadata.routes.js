const express  = require('express');
const router   = express.Router();
const FileMetadata = require('./FileMetadata.model');

// POST /metadata — save metadata after upload
router.post('/', async (req, res) => {
  try {
    const { originalName, storedName, mimeType, size, path } = req.body;

    if (!originalName || !storedName || !mimeType || !size || !path) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const metadata = new FileMetadata({ originalName, storedName, mimeType, size, path });
    await metadata.save();

    res.status(201).json({ message: 'Metadata saved', data: metadata });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /metadata — list all files
router.get('/', async (req, res) => {
  try {
    const files = await FileMetadata.find({ isDeleted: false });
    res.json({ data: files });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /metadata/:storedName — get single file info
router.get('/:storedName', async (req, res) => {
  try {
    const file = await FileMetadata.findOne({
      storedName: req.params.storedName,
      isDeleted: false,
    });

    if (!file) return res.status(404).json({ error: 'File not found' });

    res.json({ data: file });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /metadata/:storedName — soft delete
router.delete('/:storedName', async (req, res) => {
  try {
    const file = await FileMetadata.findOneAndUpdate(
      { storedName: req.params.storedName },
      { isDeleted: true },
      { new: true }
    );

    if (!file) return res.status(404).json({ error: 'File not found' });

    res.json({ message: 'Metadata deleted', data: file });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;