const bookingService = require("./booking.service");
const { success, error } = require("../../apiResponse");
const { generateQR } = require("../notification-service/qrGenerator");
const { sendConfirmationEmail } = require("../notification-service/emailSender");

const createBooking = async (req, res) => {
  try {
    const booking = await bookingService.bookTicket(req.body);

    // Bonus: generate QR + send email (non-blocking-ish, but awaited here for simplicity)
    const qrData = `Booking:${booking._id}|User:${booking.userEmail}|Seats:${booking.seats}`;
    const qrCode = await generateQR(qrData);
    booking.qrCode = qrCode;
    await booking.save();

    await sendConfirmationEmail(booking.userEmail, booking);

    return success(res, 201, "Booking confirmed", booking);
  } catch (err) {
    return error(res, 400, err.message);
  }
};

const cancel = async (req, res) => {
  try {
    const booking = await bookingService.cancelBooking(req.params.id);
    return success(res, 200, "Booking cancelled", booking);
  } catch (err) {
    return error(res, 400, err.message);
  }
};

const history = async (req, res) => {
  try {
    const bookings = await bookingService.getHistory(req.params.email);
    return success(res, 200, "Booking history fetched", bookings);
  } catch (err) {
    return error(res, 500, err.message);
  }
};

module.exports = { createBooking, cancel, history };