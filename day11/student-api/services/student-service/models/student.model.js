const mongoose = require("mongoose");

/**
 * Student Schema
 * Defines the shape of every student document in MongoDB
 */
const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Student name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Student email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    age: {
      type: Number,
      required: [true, "Student age is required"],
      min: [1, "Age must be at least 1"],
    },
    course: {
      type: String,
      required: [true, "Course is required"],
      trim: true,
    },
  },
  {
    // automatically adds createdAt and updatedAt fields
    timestamps: true,
  },
);

module.exports = mongoose.model("Student", studentSchema);
