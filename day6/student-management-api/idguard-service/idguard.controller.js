const axios = require("axios");
require("dotenv").config({ path: "../.env" });

// Checks if a studentId already exists
const checkDuplicateId = async (req, res) => {
  const { studentId } = req.body;

  if (!studentId) {
    return res.status(400).json({
      success: false,
      message: "studentId is required for duplicate check",
    });
  }

  try {
    const response = await axios.get(
      `${process.env.STUDENT_SERVICE_URL}/students/${studentId}`,
    );

    // If student was found, it's a duplicate
    if (response.data.success) {
      return res.status(409).json({
        success: false,
        message: `Student with ID ${studentId} already exists`,
      });
    }
  } catch (error) {
    // 404 means student not found = ID is free to use ✅
    if (error.response && error.response.status === 404) {
      return res.status(200).json({
        success: true,
        message: "Student ID is available",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Error checking student ID: " + error.message,
    });
  }
};

module.exports = { checkDuplicateId };
