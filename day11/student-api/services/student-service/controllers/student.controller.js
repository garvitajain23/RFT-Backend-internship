const studentService = require("../services/student.service");

/**
 * STUDENT CONTROLLER
 * ──────────────────
 * Sits between the route and the service.
 * Responsibilities:
 *   1. Extract data from req (body, params, query)
 *   2. Call the right service function
 *   3. Send back a clean JSON response
 *   4. Handle errors (invalid ID, missing data, not found)
 *
 * It knows about HTTP — the service layer does NOT.
 */

// ── Helper: check if a string is a valid MongoDB ObjectId ───────────────────
const mongoose = require("mongoose");
const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

// ── POST /students ───────────────────────────────────────────────────────────

const addStudent = async (req, res) => {
  try {
    const { name, email, age, course } = req.body;

    // ── Missing data check ──
    if (!name || !email || !age || !course) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: name, email, age, course",
      });
    }

    const student = await studentService.createStudent({
      name,
      email,
      age,
      course,
    });

    return res.status(201).json({
      success: true,
      message: "Student created successfully",
      data: student,
    });
  } catch (err) {
    // Duplicate email (MongoDB unique index violation)
    if (err.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "A student with this email already exists",
      });
    }
    // Mongoose validation error
    if (err.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// ── GET /students  (supports ?page=1&limit=5) ────────────────────────────────

const getAllStudents = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const result = await studentService.getAllStudents(page, limit);

    return res.status(200).json({
      success: true,
      message: "Students fetched successfully",
      ...result, // spreads { students, pagination }
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// ── GET /students/:id ────────────────────────────────────────────────────────

const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    // ── Invalid ID format check ──
    if (!isValidId(id)) {
      return res.status(400).json({
        success: false,
        message: `"${id}" is not a valid student ID`,
      });
    }

    const student = await studentService.getStudentById(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: `No student found with ID: ${id}`,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Student fetched successfully",
      data: student,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// ── PUT /students/:id ────────────────────────────────────────────────────────

const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;

    // ── Invalid ID format check ──
    if (!isValidId(id)) {
      return res.status(400).json({
        success: false,
        message: `"${id}" is not a valid student ID`,
      });
    }

    // ── Empty body check ──
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No update data provided in request body",
      });
    }

    const student = await studentService.updateStudent(id, req.body);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: `No student found with ID: ${id}`,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Student updated successfully",
      data: student,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ success: false, message: err.message });
    }
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// ── DELETE /students/:id ─────────────────────────────────────────────────────

const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    // ── Invalid ID format check ──
    if (!isValidId(id)) {
      return res.status(400).json({
        success: false,
        message: `"${id}" is not a valid student ID`,
      });
    }

    const student = await studentService.deleteStudent(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: `No student found with ID: ${id}`,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Student deleted successfully",
      data: student,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// ─────────────────────────────────────────────────────────────────────────────

module.exports = {
  addStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
