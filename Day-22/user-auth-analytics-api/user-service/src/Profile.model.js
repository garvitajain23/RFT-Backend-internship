const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    bio: { type: String, default: "" },
    location: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);