const Task = require("./taskModel");
const createServiceLogger = require("../../shared/logger");
const logger = createServiceLogger("TASK-CONTROLLER");

exports.getTasks = async (req, res) => {
  try {
    const { status, priority } = req.query;
    const filter = { userId: req.user._id };
    if (status)   filter.status   = status;
    if (priority) filter.priority = priority;
    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: tasks.length, tasks });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user._id });
    if (!task)
      return res.status(404).json({ success: false, message: "Task not found" });
    res.json({ success: true, task });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;
    const task = await Task.create({
      title, description, status, priority, dueDate,
      userId: req.user._id,
    });
    logger.info(`Task created: ${task._id}`);
    res.status(201).json({ success: true, message: "Task created", task });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!task)
      return res.status(404).json({ success: false, message: "Task not found" });
    res.json({ success: true, message: "Task updated", task });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!task)
      return res.status(404).json({ success: false, message: "Task not found" });
    logger.info(`Task deleted: ${req.params.id}`);
    res.json({ success: true, message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// BONUS: Admin only
exports.getAllTasks = async (req, res) => {
  try {
    if (req.user.role !== "admin")
      return res.status(403).json({ success: false, message: "Admins only" });
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json({ success: true, count: tasks.length, tasks });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};