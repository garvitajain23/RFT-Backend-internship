const sendEmail = require('../../utils/sendEmail');

const notifyTicketCreated = async (ticket) => {
  await sendEmail({
    to: ticket.customer.email || 'customer@example.com',
    subject: `Ticket #${ticket._id} Created`,
    text: `Your support ticket "${ticket.title}" has been created. We'll get back to you soon.`,
  });
};

const notifyTicketAssigned = async (ticket, agent) => {
  await sendEmail({
    to: agent.user?.email || 'agent@example.com',
    subject: `New Ticket Assigned: #${ticket._id}`,
    text: `You have been assigned ticket "${ticket.title}". Priority: ${ticket.priority}.`,
  });
};

const notifyTicketClosed = async (ticket) => {
  await sendEmail({
    to: ticket.customer.email || 'customer@example.com',
    subject: `Ticket #${ticket._id} Closed`,
    text: `Your support ticket "${ticket.title}" has been resolved and closed. Thank you!`,
  });
};

module.exports = { notifyTicketCreated, notifyTicketAssigned, notifyTicketClosed };