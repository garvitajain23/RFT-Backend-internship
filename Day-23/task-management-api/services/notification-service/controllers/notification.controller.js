const axios = require('axios');
const { sendReminderEmail } = require('../services/email.service');

// @route POST /api/notifications/send-reminder
// Body: { taskId, userEmail, taskTitle, dueDate }
exports.sendReminder = async (req, res) => {
  try {
    const { userEmail, taskTitle, dueDate } = req.body;

    if (!userEmail || !taskTitle || !dueDate) {
      return res.status(400).json({ message: 'userEmail, taskTitle, and dueDate are required' });
    }

    await sendReminderEmail(userEmail, taskTitle, dueDate);
    res.status(200).json({ message: 'Reminder email sent successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to send reminder', error: err.message });
  }
};

// @route POST /api/notifications/run-due-check
// Orchestrates: fetch due tasks -> fetch user emails -> send emails -> mark sent
exports.runDueCheck = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    const { data } = await axios.get(
      `${process.env.TASK_SERVICE_URL}/api/tasks/due-soon`,
      { headers: { Authorization: authHeader } }
    );

    const results = [];

    for (const task of data.tasks) {
      if (!task.assignedTo) continue;

      const userRes = await axios.get(
        `${process.env.AUTH_SERVICE_URL}/api/auth/users/${task.assignedTo}`,
        { headers: { Authorization: authHeader } }
      );

      const user = userRes.data.user;
      if (!user?.email) continue;

      await sendReminderEmail(user.email, task.title, task.dueDate);

      await axios.patch(
        `${process.env.TASK_SERVICE_URL}/api/tasks/${task._id}/reminder-sent`,
        {},
        { headers: { Authorization: authHeader } }
      );

      results.push({ taskId: task._id, email: user.email, sent: true });
    }

    res.status(200).json({ message: 'Due check completed', results });
  } catch (err) {
    res.status(500).json({ message: 'Due check failed', error: err.message });
  }
};