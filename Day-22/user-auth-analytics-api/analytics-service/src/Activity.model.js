const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    email: { type: String },
    method: { type: String, required: true },     // GET, POST, PUT, DELETE
    endpoint: { type: String, required: true },    // e.g. /api/users
    statusCode: { type: Number },
    ip: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Activity", activitySchema);