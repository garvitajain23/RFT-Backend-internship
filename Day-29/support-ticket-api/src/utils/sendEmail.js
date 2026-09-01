const nodemailer = require('nodemailer');
const logger = require('./logger');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async ({ to, subject, text, html }) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      text,
      html,
    });
    logger.info(`Email sent to ${to} - "${subject}"`);
  } catch (error) {
    // Don't crash the request if email fails — just log it
    logger.error(`Email failed to ${to}: ${error.message}`);
  }
};

module.exports = sendEmail;