const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      required: [true, "Student ID is required"],
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    course: {
      type: String,
      required: [true, "Course is required"],
      trim: true,
    },
    age: {
      type: Number,
      required: [true, "Age is required"],
      min: [10, "Age must be at least 10"],
      max: [100, "Age must be under 100"],
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  },
);

module.exports = mongoose.model("Student", studentSchema);
