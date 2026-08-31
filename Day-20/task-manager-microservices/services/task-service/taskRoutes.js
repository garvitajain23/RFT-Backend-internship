const express = require("express");
const router = express.Router();
const auth = require("../../shared/authMiddleware"); // ← from shared
const {
  getTasks, getTask, createTask, updateTask, deleteTask, getAllTasks,
} = require("./taskController");

router.use(auth);

router.get("/",       getTasks);
router.get("/all",    getAllTasks);
router.get("/:id",    getTask);
router.post("/",      createTask);
router.put("/:id",    updateTask);
router.delete("/:id", deleteTask);

module.exports = router;