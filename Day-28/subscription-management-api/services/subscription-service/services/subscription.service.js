const Subscription = require("../models/subscription.model");
const Plan = require("../../plan-service/models/plan.model");

class SubscriptionService {
  async subscribe(userId, planId) {
    const plan = await Plan.findById(planId);
    if (!plan) {
      const error = new Error("Plan not found");
      error.statusCode = 404;
      throw error;
    }

    const existing = await Subscription.findOne({ user: userId, status: "active" });
    if (existing) {
      const error = new Error("User already has an active subscription");
      error.statusCode = 400;
      throw error;
    }

    const endDate = new Date();
    endDate.setDate(endDate.getDate() + plan.durationInDays);

    const subscription = await Subscription.create({
      user: userId,
      plan: planId,
      endDate,
      history: [{ action: "subscribed", toPlan: planId }],
    });

    return subscription;
  }

  async changePlan(userId, newPlanId) {
    const subscription = await Subscription.findOne({ user: userId, status: "active" });
    if (!subscription) {
      const error = new Error("No active subscription found");
      error.statusCode = 404;
      throw error;
    }

    const oldPlan = await Plan.findById(subscription.plan);
    const newPlan = await Plan.findById(newPlanId);
    if (!newPlan) {
      const error = new Error("New plan not found");
      error.statusCode = 404;
      throw error;
    }

    const action = newPlan.price > oldPlan.price ? "upgraded" : "downgraded";

    const endDate = new Date();
    endDate.setDate(endDate.getDate() + newPlan.durationInDays);

    subscription.plan = newPlanId;
    subscription.endDate = endDate;
    subscription.status = "active";
    subscription.history.push({
      action,
      fromPlan: oldPlan._id,
      toPlan: newPlan._id,
    });

    await subscription.save();
    return subscription;
  }

  async getHistory(userId) {
    return await Subscription.find({ user: userId })
      .populate("plan", "name price billingCycle")
      .populate("history.fromPlan", "name price")
      .populate("history.toPlan", "name price")
      .sort({ createdAt: -1 });
  }

  async getActiveSubscription(userId) {
    const subscription = await Subscription.findOne({ user: userId, status: "active" }).populate(
      "plan"
    );
    if (!subscription) {
      const error = new Error("No active subscription found");
      error.statusCode = 404;
      throw error;
    }
    return subscription;
  }

  async cancelSubscription(userId) {
    const subscription = await Subscription.findOne({ user: userId, status: "active" });
    if (!subscription) {
      const error = new Error("No active subscription found");
      error.statusCode = 404;
      throw error;
    }
    subscription.status = "cancelled";
    subscription.history.push({ action: "cancelled" });
    await subscription.save();
    return subscription;
  }

  // Used by the expiry cron job
  async getExpiringSubscriptions(withinDays = 3) {
    const now = new Date();
    const futureDate = new Date();
    futureDate.setDate(now.getDate() + withinDays);

    return await Subscription.find({
      status: "active",
      endDate: { $gte: now, $lte: futureDate },
    })
      .populate("user", "name email")
      .populate("plan", "name");
  }

  async markExpiredSubscriptions() {
    const now = new Date();
    return await Subscription.updateMany(
      { status: "active", endDate: { $lt: now } },
      { $set: { status: "expired" } }
    );
  }
}

module.exports = new SubscriptionService();