const multer = require('multer');
const path = require('path');

const allowedTypes = (process.env.ALLOWED_FILE_TYPES || '').split(',');
const maxSizeBytes = (parseInt(process.env.MAX_FILE_SIZE_MB) || 10) * 1024 * 1024;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`File type ${file.mimetype} is not allowed`), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: maxSizeBytes }
});

module.exports = upload;