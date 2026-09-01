const ticketService = require('./ticket.service');
const ApiResponse = require('../../utils/apiResponse');

const createTicket = async (req, res, next) => {
  try {
    const { title, description, priority } = req.body;
    const ticket = await ticketService.createTicket({
      title,
      description,
      priority,
      customerId: req.user._id,
    });
    return ApiResponse.success(res, 201, 'Ticket created successfully', ticket);
  } catch (error) {
    next(error);
  }
};

const getTickets = async (req, res, next) => {
  try {
    const { status, priority } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    const tickets = await ticketService.getAllTickets(filter);
    return ApiResponse.success(res, 200, 'Tickets fetched', tickets);
  } catch (error) {
    next(error);
  }
};

const getTicket = async (req, res, next) => {
  try {
    const ticket = await ticketService.getTicketById(req.params.id);
    return ApiResponse.success(res, 200, 'Ticket fetched', ticket);
  } catch (error) {
    next(error);
  }
};

const assignTicket = async (req, res, next) => {
  try {
    const ticket = await ticketService.assignTicket(req.params.id, req.body.agentId, req.user._id);
    return ApiResponse.success(res, 200, 'Ticket assigned successfully', ticket);
  } catch (error) {
    next(error);
  }
};

const updateStatus = async (req, res, next) => {
  try {
    const ticket = await ticketService.updateTicketStatus(req.params.id, req.body.status, req.user._id);
    return ApiResponse.success(res, 200, 'Ticket status updated', ticket);
  } catch (error) {
    next(error);
  }
};

const updatePriority = async (req, res, next) => {
  try {
    const ticket = await ticketService.updateTicketPriority(req.params.id, req.body.priority, req.user._id);
    return ApiResponse.success(res, 200, 'Ticket priority updated', ticket);
  } catch (error) {
    next(error);
  }
};

const closeTicket = async (req, res, next) => {
  try {
    const ticket = await ticketService.closeTicket(req.params.id, req.user._id);
    return ApiResponse.success(res, 200, 'Ticket closed', ticket);
  } catch (error) {
    next(error);
  }
};

const getHistory = async (req, res, next) => {
  try {
    const history = await ticketService.getTicketHistory(req.params.id);
    return ApiResponse.success(res, 200, 'Ticket history fetched', history);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTicket,
  getTickets,
  getTicket,
  assignTicket,
  updateStatus,
  updatePriority,
  closeTicket,
  getHistory,
};