const validateFileUpload = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded' });
  }
  next();
};

const validateFolderInput = (req, res, next) => {
  const { name } = req.body;
  if (!name || name.trim().length === 0) {
    return res.status(400).json({ success: false, message: 'Folder name is required' });
  }
  next();
};

module.exports = { validateFileUpload, validateFolderInput };