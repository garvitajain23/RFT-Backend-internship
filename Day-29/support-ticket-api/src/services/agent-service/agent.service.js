const Agent = require('./agent.model');
const User = require('../auth-service/user.model');
const { ROLES } = require('../../config/constants');

const createAgentProfile = async ({ userId, department, maxActiveTickets }) => {
  const user = await User.findById(userId);
  if (!user) {
    const err = new Error('User not found');
    err.statusCode = 404;
    throw err;
  }

  // Promote user to agent role
  user.role = ROLES.AGENT;
  await user.save();

  const existing = await Agent.findOne({ user: userId });
  if (existing) {
    const err = new Error('Agent profile already exists for this user');
    err.statusCode = 400;
    throw err;
  }

  const agent = await Agent.create({ user: userId, department, maxActiveTickets });
  return agent;
};

const getAllAgents = async () => {
  return Agent.find().populate('user', 'name email role');
};

const getAgentById = async (agentId) => {
  const agent = await Agent.findById(agentId).populate('user', 'name email role');
  if (!agent) {
    const err = new Error('Agent not found');
    err.statusCode = 404;
    throw err;
  }
  return agent;
};

const updateAvailability = async (agentId, isAvailable) => {
  const agent = await Agent.findByIdAndUpdate(agentId, { isAvailable }, { new: true });
  if (!agent) {
    const err = new Error('Agent not found');
    err.statusCode = 404;
    throw err;
  }
  return agent;
};

module.exports = { createAgentProfile, getAllAgents, getAgentById, updateAvailability };