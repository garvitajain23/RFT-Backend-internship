const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendConfirmationEmail = async (to, booking) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject: "Booking Confirmation",
      html: `<h3>Your booking is confirmed!</h3>
             <p>Booking ID: ${booking._id}</p>
             <p>Seats: ${booking.seats}</p>
             <img src="${booking.qrCode}" alt="QR Code" />`,
    });
  } catch (err) {
    console.error("Email sending failed:", err.message);
    // Don't throw — booking should still succeed even if email fails
  }
};

module.exports = { sendConfirmationEmail };