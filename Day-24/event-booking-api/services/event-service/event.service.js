const Event = require("./event.model");

const createEvent = async (data) => {
  data.availableSeats = data.totalSeats;
  return await Event.create(data);
};

const getAllEvents = async () => {
  return await Event.find();
};

const getEventById = async (id) => {
  return await Event.findById(id);
};

const checkAvailability = async (id) => {
  const event = await Event.findById(id);
  if (!event) return null;
  return { availableSeats: event.availableSeats, totalSeats: event.totalSeats };
};

module.exports = { createEvent, getAllEvents, getEventById, checkAvailability };