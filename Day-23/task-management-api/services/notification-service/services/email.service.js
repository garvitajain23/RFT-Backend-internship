const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendReminderEmail = async (toEmail, taskTitle, dueDate) => {
  const mailOptions = {
    from: `"Task Manager" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: `⏰ Reminder: Task "${taskTitle}" is due soon`,
    html: `
      <h3>Task Reminder</h3>
      <p>Your task <strong>${taskTitle}</strong> is due on <strong>${new Date(dueDate).toLocaleString()}</strong>.</p>
      <p>Please make sure to complete it on time.</p>
    `,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendReminderEmail };