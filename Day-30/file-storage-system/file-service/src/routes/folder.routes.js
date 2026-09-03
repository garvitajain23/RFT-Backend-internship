const express = require('express');
const router = express.Router();
const protect = require('../middlewares/auth.middleware');
const { validateFolderInput } = require('../validators/file.validator');
const {
  createFolder,
  getFolders,
  getFolderById,
  updateFolder,
  deleteFolder
} = require('../controllers/folder.controller');

router.use(protect);

router.post('/', validateFolderInput, createFolder);
router.get('/', getFolders);
router.get('/:id', getFolderById);
router.put('/:id', validateFolderInput, updateFolder);
router.delete('/:id', deleteFolder);

module.exports = router;