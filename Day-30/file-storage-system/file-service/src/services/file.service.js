const File = require('../models/file.model');
const FileVersion = require('../models/fileVersion.model');

class FileService {
  static async createVersionSnapshot(file, uploadedBy) {
    return FileVersion.create({
      file: file._id,
      versionNumber: file.currentVersion,
      storedName: file.storedName,
      path: file.path,
      size: file.size,
      uploadedBy
    });
  }

  static async searchFiles(userId, query) {
    const { keyword, mimeType, minSize, maxSize, folder } = query;
    const filter = { owner: userId };

    if (keyword) filter.$text = { $search: keyword };
    if (mimeType) filter.mimeType = mimeType;
    if (folder) filter.folder = folder;
    if (minSize || maxSize) {
      filter.size = {};
      if (minSize) filter.size.$gte = Number(minSize);
      if (maxSize) filter.size.$lte = Number(maxSize);
    }

    return File.find(filter).sort({ createdAt: -1 });
  }
}

module.exports = FileService;