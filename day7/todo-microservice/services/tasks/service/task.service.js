// In-memory state — this is our "database" for Day 7
let tasks = [];
let nextId = 1;

const getAllTasks = (status) => {
  if (status === "completed") return tasks.filter((t) => t.completed === true);
  if (status === "pending") return tasks.filter((t) => t.completed === false);
  return tasks;
};

const getTaskById = (id) => tasks.find((t) => t.id === id);

const addTask = (title) => {
  const task = { id: nextId++, title, completed: false };
  tasks.push(task);
  return task;
};

const markCompleted = (id) => {
  const task = getTaskById(id);
  if (!task) return null;
  task.completed = true; // Partial update — only this field changes
  return task;
};

const deleteTask = (id) => {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return null;
  const deleted = tasks.splice(index, 1);
  return deleted[0];
};

module.exports = {
  getAllTasks,
  addTask,
  markCompleted,
  deleteTask,
  getTaskById,
};
