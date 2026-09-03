const path = require('path');
const File = require('../models/file.model');
const FileVersion = require('../models/fileVersion.model');
const DownloadLog = require('../models/downloadLog.model');
const StorageService = require('../services/storage.service');
const FileService = require('../services/file.service');

// @route POST /api/files/upload
exports.uploadFile = async (req, res, next) => {
  try {
    const { folder, tags, isPublic } = req.body;

    const file = await File.create({
      originalName: req.file.originalname,
      storedName: req.file.filename,
      path: req.file.path,
      mimeType: req.file.mimetype,
      size: req.file.size,
      owner: req.user.id,
      folder: folder || null,
      isPublic: isPublic === 'true',
      tags: tags ? tags.split(',').map(t => t.trim()) : []
    });

    res.status(201).json({ success: true, message: 'File uploaded successfully', data: file });
  } catch (err) {
    next(err);
  }
};

// @route POST /api/files/:id/new-version (Bonus: file versioning)
exports.addNewVersion = async (req, res, next) => {
  try {
    const file = req.file; // attached by checkFileAccess middleware

    // Save current version as history before overwriting
    await FileService.createVersionSnapshot(file, req.user.id);

    file.storedName = req.uploadedFile.filename;
    file.path = req.uploadedFile.path;
    file.size = req.uploadedFile.size;
    file.mimeType = req.uploadedFile.mimetype;
    file.currentVersion += 1;
    await file.save();

    res.status(200).json({ success: true, message: 'New version uploaded', data: file });
  } catch (err) {
    next(err);
  }
};

// @route GET /api/files
exports.getAllFiles = async (req, res, next) => {
  try {
    const files = await File.find({ owner: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: files });
  } catch (err) {
    next(err);
  }
};

// @route GET /api/files/search
exports.searchFiles = async (req, res, next) => {
  try {
    const results = await FileService.searchFiles(req.user.id, req.query);
    res.status(200).json({ success: true, data: results });
  } catch (err) {
    next(err);
  }
};

// @route GET /api/files/:id
exports.getFileMetadata = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, data: req.file });
  } catch (err) {
    next(err);
  }
};

// @route PUT /api/files/:id
exports.updateFileMetadata = async (req, res, next) => {
  try {
    const { originalName, tags, isPublic, folder } = req.body;
    const file = req.file;

    if (originalName) file.originalName = originalName;
    if (tags) file.tags = tags.split(',').map(t => t.trim());
    if (isPublic !== undefined) file.isPublic = isPublic === 'true' || isPublic === true;
    if (folder !== undefined) file.folder = folder || null;

    await file.save();
    res.status(200).json({ success: true, message: 'Metadata updated', data: file });
  } catch (err) {
    next(err);
  }
};

// @route GET /api/files/:id/download
exports.downloadFile = async (req, res, next) => {
  try {
    const file = req.file;

    // Bonus: download activity log
    await DownloadLog.create({
      file: file._id,
      downloadedBy: req.user.id,
      ipAddress: req.ip
    });

    return res.download(file.path, file.originalName);
  } catch (err) {
    next(err);
  }
};

// @route GET /api/files/:id/logs (Bonus: activity logs)
exports.getDownloadLogs = async (req, res, next) => {
  try {
    const logs = await DownloadLog.find({ file: req.file._id }).sort({ downloadedAt: -1 });
    res.status(200).json({ success: true, data: logs });
  } catch (err) {
    next(err);
  }
};

// @route GET /api/files/:id/versions (Bonus)
exports.getFileVersions = async (req, res, next) => {
  try {
    const versions = await FileVersion.find({ file: req.file._id }).sort({ versionNumber: -1 });
    res.status(200).json({ success: true, data: versions });
  } catch (err) {
    next(err);
  }
};

// @route DELETE /api/files/:id
exports.deleteFile = async (req, res, next) => {
  try {
    const file = req.file;

    if (file.owner !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Only owner can delete' });
    }

    StorageService.deleteLocalFile(file.path);

    await file.deleteOne();
    res.status(200).json({ success: true, message: 'File deleted successfully' });
  } catch (err) {
    next(err);
  }
};

// @route POST /api/files/:id/share
exports.shareFile = async (req, res, next) => {
  try {
    const { userId, permission } = req.body;
    const file = req.file;

    if (file.owner !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Only owner can share' });
    }

    const existing = file.sharedWith.find(s => s.user === userId);
    if (existing) {
      existing.permission = permission;
    } else {
      file.sharedWith.push({ user: userId, permission });
    }

    await file.save();
    res.status(200).json({ success: true, message: 'File shared', data: file });
  } catch (err) {
    next(err);
  }
};