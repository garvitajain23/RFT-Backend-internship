const eventService = require("./event.service");
const { success, error } = require("../../apiResponse");

const registerEvent = async (req, res) => {
  try {
    const event = await eventService.createEvent(req.body);
    return success(res, 201, "Event registered successfully", event);
  } catch (err) {
    return error(res, 400, err.message);
  }
};

const listEvents = async (req, res) => {
  try {
    const events = await eventService.getAllEvents();
    return success(res, 200, "Events fetched successfully", events);
  } catch (err) {
    return error(res, 500, err.message);
  }
};

const getAvailability = async (req, res) => {
  try {
    const availability = await eventService.checkAvailability(req.params.id);
    if (!availability) return error(res, 404, "Event not found");
    return success(res, 200, "Availability fetched", availability);
  } catch (err) {
    return error(res, 500, err.message);
  }
};

module.exports = { registerEvent, listEvents, getAvailability };