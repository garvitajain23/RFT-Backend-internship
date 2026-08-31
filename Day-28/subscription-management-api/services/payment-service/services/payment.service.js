const Payment = require("../models/payment.model");

class PaymentService {
  async createPayment({ userId, subscriptionId, amount, method }) {
    // Simulated payment gateway response
    const isSuccess = Math.random() > 0.1; // 90% success simulation

    const payment = await Payment.create({
      user: userId,
      subscription: subscriptionId,
      amount,
      method,
      status: isSuccess ? "success" : "failed",
      transactionId: "TXN" + Date.now(),
    });

    return payment;
  }

  async getPaymentStatus(paymentId) {
    const payment = await Payment.findById(paymentId);
    if (!payment) {
      const error = new Error("Payment not found");
      error.statusCode = 404;
      throw error;
    }
    return payment;
  }

  async getUserPayments(userId) {
    return await Payment.find({ user: userId })
      .populate("subscription")
      .sort({ createdAt: -1 });
  }
}

module.exports = new PaymentService();