const Ticket = require('../ticket-service/ticket.model');

const getTicketCountsByStatus = async () => {
  const result = await Ticket.aggregate([
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);
  return result.reduce((acc, curr) => ({ ...acc, [curr._id]: curr.count }), {});
};

const getTicketCountsByPriority = async () => {
  const result = await Ticket.aggregate([
    { $group: { _id: '$priority', count: { $sum: 1 } } },
  ]);
  return result.reduce((acc, curr) => ({ ...acc, [curr._id]: curr.count }), {});
};

const getAgentPerformance = async () => {
  return Ticket.aggregate([
    { $match: { assignedAgent: { $ne: null } } },
    {
      $group: {
        _id: '$assignedAgent',
        totalAssigned: { $sum: 1 },
        closed: {
          $sum: { $cond: [{ $eq: ['$status', 'closed'] }, 1, 0] },
        },
      },
    },
    {
      $lookup: {
        from: 'agents',
        localField: '_id',
        foreignField: '_id',
        as: 'agentInfo',
      },
    },
    { $unwind: '$agentInfo' },
  ]);
};

const getAverageResolutionTime = async () => {
  const closedTickets = await Ticket.find({ status: 'closed', closedAt: { $ne: null } });
  if (closedTickets.length === 0) return 0;

  const totalMs = closedTickets.reduce((sum, t) => {
    return sum + (new Date(t.closedAt) - new Date(t.createdAt));
  }, 0);

  const avgMs = totalMs / closedTickets.length;
  return (avgMs / (1000 * 60 * 60)).toFixed(2); // in hours
};

const getDashboardSummary = async () => {
  const [byStatus, byPriority, agentPerformance, avgResolutionHours] = await Promise.all([
    getTicketCountsByStatus(),
    getTicketCountsByPriority(),
    getAgentPerformance(),
    getAverageResolutionTime(),
  ]);

  const totalTickets = await Ticket.countDocuments();

  return { totalTickets, byStatus, byPriority, agentPerformance, avgResolutionHours };
};

module.exports = {
  getTicketCountsByStatus,
  getTicketCountsByPriority,
  getAgentPerformance,
  getAverageResolutionTime,
  getDashboardSummary,
};