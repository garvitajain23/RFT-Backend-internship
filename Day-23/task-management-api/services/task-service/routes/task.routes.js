const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');
const authenticate = require('../../../shared/middlewares/auth.middleware');
const authorize = require('../../../shared/middlewares/role.middleware');

// All task routes require authentication
router.use(authenticate);

router.post('/', authorize('admin', 'manager'), taskController.createTask);
router.get('/', taskController.getTasks);
router.get('/due-soon', taskController.getTasksDueSoon); // internal use
router.get('/:id', taskController.getTaskById);
router.put('/:id', authorize('admin', 'manager'), taskController.updateTask);
router.patch('/:id/status', taskController.updateStatus);
router.patch('/:id/assign', authorize('admin', 'manager'), taskController.assignTask);
router.patch('/:id/due-date', authorize('admin', 'manager'), taskController.updateDueDate);
router.patch('/:id/reminder-sent', taskController.markReminderSent); // internal use
router.delete('/:id', authorize('admin', 'manager'), taskController.deleteTask);

module.exports = router;