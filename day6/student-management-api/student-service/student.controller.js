const Student = require("./student.model");

// POST /students - Add a student
const addStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    const saved = await student.save();
    res.status(201).json({
      success: true,
      message: "Student added successfully",
      data: saved,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// GET /students - Get all students
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json({
      success: true,
      count: students.length,
      data: students,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET /students/:id - Get one student
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findOne({ studentId: req.params.id });
    if (!student) {
      return res.status(404).json({
        success: false,
        message: `No student found with ID: ${req.params.id}`,
      });
    }
    res.status(200).json({
      success: true,
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// PUT /students/:id - Update a student
const updateStudent = async (req, res) => {
  try {
    const updated = await Student.findOneAndUpdate(
      { studentId: req.params.id },
      req.body,
      { new: true, runValidators: true },
    );
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: `No student found with ID: ${req.params.id}`,
      });
    }
    res.status(200).json({
      success: true,
      message: "Student updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE /students/:id - Delete a student
const deleteStudent = async (req, res) => {
  try {
    const deleted = await Student.findOneAndDelete({
      studentId: req.params.id,
    });
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: `No student found with ID: ${req.params.id}`,
      });
    }
    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
      data: deleted,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
