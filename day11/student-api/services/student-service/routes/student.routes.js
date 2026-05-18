const express = require("express");
const router = express.Router();
const controller = require("../controllers/student.controller");

/**
 * STUDENT ROUTES
 * ──────────────
 * Maps HTTP method + URL path → controller function
 *
 * Base path (set in index.js): /students
 *
 * POST   /students          → add a new student
 * GET    /students          → get all students (+ pagination via ?page=&limit=)
 * GET    /students/:id      → get one student by MongoDB ObjectId
 * PUT    /students/:id      → update a student
 * DELETE /students/:id      → delete a student
 */

router.post("/", controller.addStudent);
router.get("/", controller.getAllStudents);
router.get("/:id", controller.getStudentById);
router.put("/:id", controller.updateStudent);
router.delete("/:id", controller.deleteStudent);

module.exports = router;
