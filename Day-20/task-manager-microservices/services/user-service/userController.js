const User = require("./userModel");
const createServiceLogger = require("../../shared/logger");
const logger = createServiceLogger("USER-CONTROLLER");

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-__v");
    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const allowed = ["name", "bio", "avatar"];
    const updates = {};
    allowed.forEach((f) => { if (req.body[f] !== undefined) updates[f] = req.body[f]; });

    const user = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true, runValidators: true,
    });
    logger.info(`Profile updated: ${req.user._id}`);
    res.json({ success: true, message: "Profile updated", user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// BONUS: Admin only
exports.getAllUsers = async (req, res) => {
  try {
    if (req.user.role !== "admin")
      return res.status(403).json({ success: false, message: "Admins only" });
    const users = await User.find().select("-__v");
    res.json({ success: true, count: users.length, users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};