const Profile = require("./Profile.model");

exports.createProfile = async (req, res) => {
  try {
    const existing = await Profile.findOne({ userId: req.user.id });
    if (existing) return res.status(409).json({ success: false, message: "Profile already exists" });

    const profile = await Profile.create({
      userId: req.user.id,
      name: req.body.name || req.user.email,
      email: req.user.email,
      bio: req.body.bio,
      location: req.body.location,
    });

    res.status(201).json({ success: true, profile });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getMyProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.user.id });
    if (!profile) return res.status(404).json({ success: false, message: "Profile not found" });
    res.status(200).json({ success: true, profile });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Pagination + Search (bonus)
exports.getAllProfiles = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";

    const query = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
            { location: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const total = await Profile.countDocuments(query);
    const profiles = await Profile.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: profiles.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      profiles,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, bio, location } = req.body;
    const profile = await Profile.findOneAndUpdate(
      { userId: req.user.id },
      { $set: { name, bio, location } },
      { new: true, runValidators: true }
    );
    if (!profile) return res.status(404).json({ success: false, message: "Profile not found" });
    res.status(200).json({ success: true, profile });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    const targetUserId =
      req.user.role === "admin" && req.params.userId ? req.params.userId : req.user.id;

    const profile = await Profile.findOneAndDelete({ userId: targetUserId });
    if (!profile) return res.status(404).json({ success: false, message: "Profile not found" });
    res.status(200).json({ success: true, message: "Profile deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};