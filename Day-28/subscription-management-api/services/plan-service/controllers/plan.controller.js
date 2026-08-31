const planService = require("../services/plan.service");
const ApiResponse = require("../../../shared/utils/apiResponse");

class PlanController {
  async createPlan(req, res, next) {
    try {
      const plan = await planService.createPlan(req.body);
      return ApiResponse.success(res, "Plan created successfully", plan, 201);
    } catch (err) {
      next(err);
    }
  }

  async getAllPlans(req, res, next) {
    try {
      const plans = await planService.getAllPlans();
      return ApiResponse.success(res, "Plans fetched successfully", plans);
    } catch (err) {
      next(err);
    }
  }

  async getPlanById(req, res, next) {
    try {
      const plan = await planService.getPlanById(req.params.id);
      return ApiResponse.success(res, "Plan fetched successfully", plan);
    } catch (err) {
      next(err);
    }
  }

  async updatePlan(req, res, next) {
    try {
      const plan = await planService.updatePlan(req.params.id, req.body);
      return ApiResponse.success(res, "Plan updated successfully", plan);
    } catch (err) {
      next(err);
    }
  }

  async deletePlan(req, res, next) {
    try {
      const plan = await planService.deletePlan(req.params.id);
      return ApiResponse.success(res, "Plan deactivated successfully", plan);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new PlanController();