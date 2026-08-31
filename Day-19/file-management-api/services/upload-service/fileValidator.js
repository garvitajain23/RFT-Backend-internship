const multer = require('multer');
const path   = require('path');
const { v4: uuidv4 } = require('uuid');

const MAX_SIZE     = parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024;
const ALLOWED_TYPES = (process.env.ALLOWED_TYPES || '').split(',');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './services/upload-service/uploads/'),
  filename:    (req, file, cb) => {
    const ext        = path.extname(file.originalname);
    const uniqueName = `${uuidv4()}${ext}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  if (ALLOWED_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Invalid type: ${file.mimetype}. Allowed: ${ALLOWED_TYPES.join(', ')}`), false);
  }
};

const upload = multer({ storage, limits: { fileSize: MAX_SIZE }, fileFilter });

const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({
        error: `File too large. Max allowed: ${MAX_SIZE / (1024 * 1024)}MB`,
      });
    }
    return res.status(400).json({ error: err.message });
  }
  if (err) return res.status(400).json({ error: err.message });
  next();
};

module.exports = { upload, handleMulterError };