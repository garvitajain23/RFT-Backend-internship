const File = require('../models/file.model');

// Checks whether req.user has access to the file (owner, shared, or public)
const checkFileAccess = (requiredPermission = 'view') => {
  return async (req, res, next) => {
    try {
      const file = await File.findById(req.params.id);
      if (!file) return res.status(404).json({ success: false, message: 'File not found' });

      const userId = req.user.id;

      if (file.owner === userId) {
        req.file = file;
        return next();
      }

      if (file.isPublic && requiredPermission === 'view') {
        req.file = file;
        return next();
      }

      const sharedEntry = file.sharedWith.find(s => s.user === userId);
      if (sharedEntry) {
        if (requiredPermission === 'view') {
          req.file = file;
          return next();
        }
        if (requiredPermission === 'edit' && sharedEntry.permission === 'edit') {
          req.file = file;
          return next();
        }
      }

      return res.status(403).json({ success: false, message: 'Access denied' });
    } catch (err) {
      next(err);
    }
  };
};

module.exports = checkFileAccess;