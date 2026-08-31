const Plan = require("../models/plan.model");

class PlanService {
  async createPlan(data) {
    return await Plan.create(data);
  }

  async getAllPlans() {
    return await Plan.find({ isActive: true });
  }

  async getPlanById(id) {
    const plan = await Plan.findById(id);
    if (!plan) {
      const error = new Error("Plan not found");
      error.statusCode = 404;
      throw error;
    }
    return plan;
  }

  async updatePlan(id, data) {
    const plan = await Plan.findByIdAndUpdate(id, data, { new: true });
    if (!plan) {
      const error = new Error("Plan not found");
      error.statusCode = 404;
      throw error;
    }
    return plan;
  }

  async deletePlan(id) {
    const plan = await Plan.findByIdAndUpdate(id, { isActive: false }, { new: true });
    if (!plan) {
      const error = new Error("Plan not found");
      error.statusCode = 404;
      throw error;
    }
    return plan;
  }
}

module.exports = new PlanService();