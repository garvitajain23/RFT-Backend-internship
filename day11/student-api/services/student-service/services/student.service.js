const Student = require("../models/student.model");

/**
 * STUDENT SERVICE
 * ───────────────
 * All database operations live here.
 * Controller calls these functions — it never touches the DB directly.
 * This separation means if you swap MongoDB for PostgreSQL tomorrow,
 * you only change this file.
 */

// ── CREATE ──────────────────────────────────────────────────────────────────

const createStudent = async (data) => {
  // mongoose will validate against the schema before saving
  const student = new Student(data);
  return await student.save();
};

// ── READ ALL  (with optional pagination) ────────────────────────────────────

const getAllStudents = async (page, limit) => {
  // page and limit come from query params e.g. /students?page=1&limit=5
  const pageNum = parseInt(page) || 1; // default page  = 1
  const limitNum = parseInt(limit) || 10; // default limit = 10
  const skip = (pageNum - 1) * limitNum;

  const [students, total] = await Promise.all([
    Student.find().skip(skip).limit(limitNum).sort({ createdAt: -1 }),
    Student.countDocuments(),
  ]);

  return {
    students,
    pagination: {
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum),
    },
  };
};

// ── READ ONE ─────────────────────────────────────────────────────────────────

const getStudentById = async (id) => {
  // mongoose throws CastError if id is not a valid ObjectId
  const student = await Student.findById(id);
  return student; // null if not found — controller handles that case
};

// ── UPDATE ───────────────────────────────────────────────────────────────────

const updateStudent = async (id, data) => {
  const student = await Student.findByIdAndUpdate(id, data, {
    new: true, // return updated document, not the old one
    runValidators: true, // re-run schema validators on update
  });
  return student; // null if not found
};

// ── DELETE ───────────────────────────────────────────────────────────────────

const deleteStudent = async (id) => {
  const student = await Student.findByIdAndDelete(id);
  return student; // null if not found
};

// ─────────────────────────────────────────────────────────────────────────────

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
