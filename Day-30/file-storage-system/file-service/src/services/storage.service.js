const fs = require('fs');

// Handles local disk storage operations
class StorageService {
  static deleteLocalFile(filePath) {
    fs.unlink(filePath, (err) => {
      if (err) console.error('Failed to delete local file:', err.message);
    });
  }
}

module.exports = StorageService;