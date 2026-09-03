const express = require('express');
const router = express.Router();
const protect = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');
const checkFileAccess = require('../middlewares/permission.middleware');
const { validateFileUpload } = require('../validators/file.validator');

const {
  uploadFile,
  addNewVersion,
  getAllFiles,
  searchFiles,
  getFileMetadata,
  updateFileMetadata,
  downloadFile,
  getDownloadLogs,
  getFileVersions,
  deleteFile,
  shareFile
} = require('../controllers/file.controller');

router.use(protect);

router.post('/upload', upload.single('file'), validateFileUpload, uploadFile);
router.get('/search', searchFiles);
router.get('/', getAllFiles);

router.get('/:id', checkFileAccess('view'), getFileMetadata);
router.put('/:id', checkFileAccess('edit'), updateFileMetadata);
router.delete('/:id', checkFileAccess('edit'), deleteFile);

router.get('/:id/download', checkFileAccess('view'), downloadFile);
router.get('/:id/logs', checkFileAccess('view'), getDownloadLogs);

router.post('/:id/share', checkFileAccess('edit'), shareFile);

// Versioning: attach uploaded file as req.uploadedFile, then run controller
router.post(
  '/:id/new-version',
  checkFileAccess('edit'),
  upload.single('file'),
  validateFileUpload,
  (req, res, next) => {
    req.uploadedFile = req.file; // multer file object
    next();
  },
  addNewVersion
);
router.get('/:id/versions', checkFileAccess('view'), getFileVersions);

module.exports = router;