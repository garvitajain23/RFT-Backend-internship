const adminService = require("../services/admin.service");
const ApiResponse = require("../../../shared/utils/apiResponse");

class AdminController {
  async getAnalytics(req, res, next) {
    try {
      const analytics = await adminService.getAnalytics();
      return ApiResponse.success(res, "Analytics fetched successfully", analytics);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AdminController();