const taskService = require("../service/task.service");

// GET /tasks  OR  GET /tasks?status=completed
const getTasks = (req, res) => {
  const { status } = req.query;
  const tasks = taskService.getAllTasks(status);
  res.json({ success: true, count: tasks.length, data: tasks });
};

// GET /tasks/:id
const getTask = (req, res) => {
  const task = taskService.getTaskById(Number(req.params.id));
  if (!task)
    return res.status(404).json({ success: false, message: "Task not found" });
  res.json({ success: true, data: task });
};

// POST /tasks  →  body: { title }
const createTask = (req, res) => {
  const { title } = req.body;
  if (!title)
    return res
      .status(400)
      .json({ success: false, message: "Title is required" });
  const task = taskService.addTask(title);
  res.status(201).json({ success: true, data: task });
};

// PATCH /tasks/:id/complete  →  partial update
const completeTask = (req, res) => {
  const task = taskService.markCompleted(Number(req.params.id));
  if (!task)
    return res.status(404).json({ success: false, message: "Task not found" });
  res.json({ success: true, message: "Task marked as completed", data: task });
};

// DELETE /tasks/:id
const removeTask = (req, res) => {
  const task = taskService.deleteTask(Number(req.params.id));
  if (!task)
    return res.status(404).json({ success: false, message: "Task not found" });
  res.json({ success: true, message: "Task deleted", data: task });
};

module.exports = { getTasks, getTask, createTask, completeTask, removeTask };
