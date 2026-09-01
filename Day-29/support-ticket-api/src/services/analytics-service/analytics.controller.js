const analyticsService = require('./analytics.service');
const ApiResponse = require('../../utils/apiResponse');

const getSummary = async (req, res, next) => {
  try {
    const summary = await analyticsService.getDashboardSummary();
    return ApiResponse.success(res, 200, 'Analytics summary fetched', summary);
  } catch (error) {
    next(error);
  }
};

module.exports = { getSummary };