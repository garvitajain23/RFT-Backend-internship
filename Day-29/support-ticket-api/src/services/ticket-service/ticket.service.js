const Ticket = require('./ticket.model');
const Agent = require('../agent-service/agent.model');
const { TICKET_STATUS } = require('../../config/constants');
const notificationService = require('../notification-service/notification.service');

const createTicket = async ({ title, description, priority, customerId }) => {
  const ticket = await Ticket.create({
    title,
    description,
    priority,
    customer: customerId,
    history: [{ action: 'created', detail: 'Ticket created', updatedBy: customerId }],
  });

  // Fire-and-forget email notification (bonus feature)
  notificationService.notifyTicketCreated(ticket).catch(() => {});

  return ticket;
};

const getAllTickets = async (filter = {}) => {
  return Ticket.find(filter)
    .populate('customer', 'name email')
    .populate({ path: 'assignedAgent', populate: { path: 'user', select: 'name email' } })
    .sort({ createdAt: -1 });
};

const getTicketById = async (ticketId) => {
  const ticket = await Ticket.findById(ticketId)
    .populate('customer', 'name email')
    .populate({ path: 'assignedAgent', populate: { path: 'user', select: 'name email' } })
    .populate('history.updatedBy', 'name email role');

  if (!ticket) {
    const err = new Error('Ticket not found');
    err.statusCode = 404;
    throw err;
  }
  return ticket;
};

const assignTicket = async (ticketId, agentId, updatedByUserId) => {
  const ticket = await getTicketById(ticketId);
  const agent = await Agent.findById(agentId);

  if (!agent) {
    const err = new Error('Agent not found');
    err.statusCode = 404;
    throw err;
  }

  ticket.assignedAgent = agentId;
  ticket.status = TICKET_STATUS.ASSIGNED;
  ticket.history.push({
    action: 'assigned',
    detail: `Ticket assigned to agent ${agentId}`,
    updatedBy: updatedByUserId,
  });

  await ticket.save();
  notificationService.notifyTicketAssigned(ticket, agent).catch(() => {});
  return ticket;
};

const updateTicketStatus = async (ticketId, status, updatedByUserId) => {
  if (!Object.values(TICKET_STATUS).includes(status)) {
    const err = new Error('Invalid status value');
    err.statusCode = 400;
    throw err;
  }

  const ticket = await getTicketById(ticketId);
  ticket.status = status;
  ticket.history.push({
    action: 'status_changed',
    detail: `Status changed to ${status}`,
    updatedBy: updatedByUserId,
  });

  if (status === TICKET_STATUS.CLOSED) {
    ticket.closedAt = new Date();
  }

  await ticket.save();
  return ticket;
};

const updateTicketPriority = async (ticketId, priority, updatedByUserId) => {
  const ticket = await getTicketById(ticketId);
  ticket.priority = priority;
  ticket.history.push({
    action: 'priority_changed',
    detail: `Priority changed to ${priority}`,
    updatedBy: updatedByUserId,
  });

  await ticket.save();
  return ticket;
};

const closeTicket = async (ticketId, updatedByUserId) => {
  const ticket = await updateTicketStatus(ticketId, TICKET_STATUS.CLOSED, updatedByUserId);
  notificationService.notifyTicketClosed(ticket).catch(() => {});
  return ticket;
};

const getTicketHistory = async (ticketId) => {
  const ticket = await Ticket.findById(ticketId)
    .select('history title')
    .populate('history.updatedBy', 'name email role');

  if (!ticket) {
    const err = new Error('Ticket not found');
    err.statusCode = 404;
    throw err;
  }
  return ticket;
};

module.exports = {
  createTicket,
  getAllTickets,
  getTicketById,
  assignTicket,
  updateTicketStatus,
  updateTicketPriority,
  closeTicket,
  getTicketHistory,
};