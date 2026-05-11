const express = require("express");
const router = express.Router();
const {
  addStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} = require("./student.controller");

router.post("/", addStudent);
router.get("/", getAllStudents);
router.get("/:id", getStudentById);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

module.exports = router;
