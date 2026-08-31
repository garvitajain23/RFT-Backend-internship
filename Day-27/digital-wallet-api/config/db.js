const mongoose = require('mongoose');

const connectDB = async (serviceName) => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`[${serviceName}] MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[${serviceName}] MongoDB connection error:`, error.message);
    process.exit(1);
  }
};

module.exports = connectDB;