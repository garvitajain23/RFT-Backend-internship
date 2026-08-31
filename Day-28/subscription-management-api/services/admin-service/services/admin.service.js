const User = require("../../user-service/models/user.model");
const Subscription = require("../../subscription-service/models/subscription.model");
const Payment = require("../../payment-service/models/payment.model");
const Plan = require("../../plan-service/models/plan.model");

class AdminService {
  async getAnalytics() {
    const totalUsers = await User.countDocuments();
    const totalActiveSubscriptions = await Subscription.countDocuments({ status: "active" });
    const totalExpiredSubscriptions = await Subscription.countDocuments({ status: "expired" });
    const totalCancelled = await Subscription.countDocuments({ status: "cancelled" });

    const revenueAgg = await Payment.aggregate([
      { $match: { status: "success" } },
      { $group: { _id: null, totalRevenue: { $sum: "$amount" } } },
    ]);
    const totalRevenue = revenueAgg[0]?.totalRevenue || 0;

    const planWiseSubscribers = await Subscription.aggregate([
      { $match: { status: "active" } },
      { $group: { _id: "$plan", count: { $sum: 1 } } },
      {
        $lookup: {
          from: "plans",
          localField: "_id",
          foreignField: "_id",
          as: "planDetails",
        },
      },
      { $unwind: "$planDetails" },
      { $project: { planName: "$planDetails.name", count: 1, _id: 0 } },
    ]);

    return {
      totalUsers,
      totalActiveSubscriptions,
      totalExpiredSubscriptions,
      totalCancelled,
      totalRevenue,
      planWiseSubscribers,
    };
  }

  async getAllPlansWithCount() {
    return await Plan.find();
  }
}

module.exports = new AdminService();