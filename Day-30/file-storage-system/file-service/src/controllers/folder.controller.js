const Folder = require('../models/folder.model');

// @route POST /api/folders
exports.createFolder = async (req, res, next) => {
  try {
    const { name, parentFolder } = req.body;
    const folder = await Folder.create({
      name,
      owner: req.user.id,
      parentFolder: parentFolder || null
    });
    res.status(201).json({ success: true, message: 'Folder created', data: folder });
  } catch (err) {
    next(err);
  }
};

// @route GET /api/folders
exports.getFolders = async (req, res, next) => {
  try {
    const folders = await Folder.find({ owner: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: folders });
  } catch (err) {
    next(err);
  }
};

// @route GET /api/folders/:id
exports.getFolderById = async (req, res, next) => {
  try {
    const folder = await Folder.findOne({ _id: req.params.id, owner: req.user.id });
    if (!folder) return res.status(404).json({ success: false, message: 'Folder not found' });
    res.status(200).json({ success: true, data: folder });
  } catch (err) {
    next(err);
  }
};

// @route PUT /api/folders/:id
exports.updateFolder = async (req, res, next) => {
  try {
    const folder = await Folder.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      { name: req.body.name },
      { new: true }
    );
    if (!folder) return res.status(404).json({ success: false, message: 'Folder not found' });
    res.status(200).json({ success: true, message: 'Folder updated', data: folder });
  } catch (err) {
    next(err);
  }
};

// @route DELETE /api/folders/:id
exports.deleteFolder = async (req, res, next) => {
  try {
    const folder = await Folder.findOneAndDelete({ _id: req.params.id, owner: req.user.id });
    if (!folder) return res.status(404).json({ success: false, message: 'Folder not found' });
    res.status(200).json({ success: true, message: 'Folder deleted' });
  } catch (err) {
    next(err);
  }
};