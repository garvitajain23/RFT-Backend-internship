const Activity = require("./Activity.model");

// Log a user action — called by the gateway (or any service) after each request
exports.logActivity = async (req, res) => {
  try {
    const { userId, email, method, endpoint, statusCode, ip } = req.body;
    if (!userId || !method || !endpoint) {
      return res.status(400).json({ success: false, message: "userId, method, endpoint required" });
    }

    const activity = await Activity.create({ userId, email, method, endpoint, statusCode, ip });
    res.status(201).json({ success: true, activity });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get activity log — pagination + search (bonus)
exports.getActivities = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";

    const query = search
      ? {
          $or: [
            { endpoint: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
            { method: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const total = await Activity.countDocuments(query);
    const activities = await Activity.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: activities.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      activities,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// API usage statistics
exports.getStats = async (req, res) => {
  try {
    const totalRequests = await Activity.countDocuments();

    const byEndpoint = await Activity.aggregate([
      { $group: { _id: "$endpoint", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    const byMethod = await Activity.aggregate([
      { $group: { _id: "$method", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    const byUser = await Activity.aggregate([
      { $group: { _id: "$userId", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);

    res.status(200).json({
      success: true,
      totalRequests,
      byEndpoint,
      byMethod,
      topUsers: byUser,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};