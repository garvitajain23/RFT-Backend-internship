const Task = require('../models/task.model');

// @route POST /api/tasks
exports.createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate, assignedTo, status } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const task = await Task.create({
      title,
      description,
      priority,
      dueDate,
      assignedTo: assignedTo || null,
      status,
      createdBy: req.user.id,
    });

    res.status(201).json({ message: 'Task created successfully', task });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create task', error: err.message });
  }
};

// @route GET /api/tasks  (with pagination & filtering)
exports.getTasks = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      priority,
      assignedTo,
      dueBefore,
      dueAfter,
      search,
      sortBy = 'createdAt',
      order = 'desc',
    } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (assignedTo) filter.assignedTo = assignedTo;
    if (dueBefore || dueAfter) {
      filter.dueDate = {};
      if (dueBefore) filter.dueDate.$lte = new Date(dueBefore);
      if (dueAfter) filter.dueDate.$gte = new Date(dueAfter);
    }
    if (search) filter.$text = { $search: search };

    const pageNum = Math.max(parseInt(page), 1);
    const limitNum = Math.max(parseInt(limit), 1);
    const skip = (pageNum - 1) * limitNum;

    const sortOrder = order === 'asc' ? 1 : -1;

    const [tasks, total] = await Promise.all([
      Task.find(filter).sort({ [sortBy]: sortOrder }).skip(skip).limit(limitNum),
      Task.countDocuments(filter),
    ]);

    res.status(200).json({
      tasks,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch tasks', error: err.message });
  }
};

// @route GET /api/tasks/:id
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.status(200).json({ task });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch task', error: err.message });
  }
};

// @route PUT /api/tasks/:id
exports.updateTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate, assignedTo } = req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, priority, dueDate, assignedTo },
      { new: true, runValidators: true }
    );

    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.status(200).json({ message: 'Task updated successfully', task });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update task', error: err.message });
  }
};

// @route PATCH /api/tasks/:id/status
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'in-progress', 'completed', 'cancelled'];

    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({ message: `Status must be one of: ${validStatuses.join(', ')}` });
    }

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.status(200).json({ message: 'Task status updated', task });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update status', error: err.message });
  }
};

// @route PATCH /api/tasks/:id/assign
exports.assignTask = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ message: 'userId is required' });

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { assignedTo: userId },
      { new: true, runValidators: true }
    );

    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.status(200).json({ message: 'Task assigned successfully', task });
  } catch (err) {
    res.status(500).json({ message: 'Failed to assign task', error: err.message });
  }
};

// @route PATCH /api/tasks/:id/due-date
exports.updateDueDate = async (req, res) => {
  try {
    const { dueDate } = req.body;
    if (!dueDate) return res.status(400).json({ message: 'dueDate is required' });

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { dueDate: new Date(dueDate), reminderSent: false },
      { new: true, runValidators: true }
    );

    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.status(200).json({ message: 'Due date updated', task });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update due date', error: err.message });
  }
};

// @route DELETE /api/tasks/:id
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete task', error: err.message });
  }
};

// Internal - used by notification-service to find tasks due soon
exports.getTasksDueSoon = async (req, res) => {
  try {
    const now = new Date();
    const in24h = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    const tasks = await Task.find({
      dueDate: { $gte: now, $lte: in24h },
      reminderSent: false,
      status: { $nin: ['completed', 'cancelled'] },
    });

    res.status(200).json({ tasks });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch due tasks', error: err.message });
  }
};

// Internal - mark reminder as sent
exports.markReminderSent = async (req, res) => {
  try {
    await Task.findByIdAndUpdate(req.params.id, { reminderSent: true });
    res.status(200).json({ message: 'Reminder marked as sent' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to mark reminder', error: err.message });
  }
};