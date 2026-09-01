const agentService = require('./agent.service');
const ApiResponse = require('../../utils/apiResponse');

const createAgent = async (req, res, next) => {
  try {
    const agent = await agentService.createAgentProfile(req.body);
    return ApiResponse.success(res, 201, 'Agent profile created', agent);
  } catch (error) {
    next(error);
  }
};

const getAgents = async (req, res, next) => {
  try {
    const agents = await agentService.getAllAgents();
    return ApiResponse.success(res, 200, 'Agents fetched', agents);
  } catch (error) {
    next(error);
  }
};

const getAgent = async (req, res, next) => {
  try {
    const agent = await agentService.getAgentById(req.params.id);
    return ApiResponse.success(res, 200, 'Agent fetched', agent);
  } catch (error) {
    next(error);
  }
};

const setAvailability = async (req, res, next) => {
  try {
    const agent = await agentService.updateAvailability(req.params.id, req.body.isAvailable);
    return ApiResponse.success(res, 200, 'Agent availability updated', agent);
  } catch (error) {
    next(error);
  }
};

module.exports = { createAgent, getAgents, getAgent, setAvailability };