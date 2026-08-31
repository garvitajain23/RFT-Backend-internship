const subscriptionService = require("../services/subscription.service");
const ApiResponse = require("../../../shared/utils/apiResponse");

class SubscriptionController {
  async subscribe(req, res, next) {
    try {
      const { planId } = req.body;
      const subscription = await subscriptionService.subscribe(req.user.id, planId);
      return ApiResponse.success(res, "Subscribed successfully", subscription, 201);
    } catch (err) {
      next(err);
    }
  }

  async changePlan(req, res, next) {
    try {
      const { planId } = req.body;
      const subscription = await subscriptionService.changePlan(req.user.id, planId);
      return ApiResponse.success(res, "Plan changed successfully", subscription);
    } catch (err) {
      next(err);
    }
  }

  async getHistory(req, res, next) {
    try {
      const history = await subscriptionService.getHistory(req.user.id);
      return ApiResponse.success(res, "Subscription history fetched", history);
    } catch (err) {
      next(err);
    }
  }

  async getActive(req, res, next) {
    try {
      const subscription = await subscriptionService.getActiveSubscription(req.user.id);
      return ApiResponse.success(res, "Active subscription fetched", subscription);
    } catch (err) {
      next(err);
    }
  }

  async cancel(req, res, next) {
    try {
      const subscription = await subscriptionService.cancelSubscription(req.user.id);
      return ApiResponse.success(res, "Subscription cancelled", subscription);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new SubscriptionController();