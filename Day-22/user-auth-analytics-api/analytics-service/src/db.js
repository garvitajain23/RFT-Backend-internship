const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.ANALYTICS_MONGO_URI);
    console.log("✅ [Analytics Service] MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;