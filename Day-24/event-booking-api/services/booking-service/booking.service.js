const Booking = require("./booking.model");
const Event = require("../event-service/event.model");

const bookTicket = async ({ eventId, userName, userEmail, seats }) => {
  const event = await Event.findById(eventId);
  if (!event) throw new Error("Event not found");
  if (event.availableSeats < seats) throw new Error("Not enough seats available");

  event.availableSeats -= seats;
  await event.save();

  const booking = await Booking.create({ eventId, userName, userEmail, seats });
  return booking;
};

const cancelBooking = async (bookingId) => {
  const booking = await Booking.findById(bookingId);
  if (!booking) throw new Error("Booking not found");
  if (booking.status === "CANCELLED") throw new Error("Booking already cancelled");

  booking.status = "CANCELLED";
  await booking.save();

  const event = await Event.findById(booking.eventId);
  if (event) {
    event.availableSeats += booking.seats;
    await event.save();
  }

  return booking;
};

const getHistory = async (userEmail) => {
  return await Booking.find({ userEmail }).populate("eventId");
};

module.exports = { bookTicket, cancelBooking, getHistory };