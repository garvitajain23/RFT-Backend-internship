const paymentService = require("../services/payment.service");
const ApiResponse = require("../../../shared/utils/apiResponse");

class PaymentController {
  async createPayment(req, res, next) {
    try {
      const { subscriptionId, amount, method } = req.body;
      const payment = await paymentService.createPayment({
        userId: req.user.id,
        subscriptionId,
        amount,
        method,
      });
      return ApiResponse.success(res, "Payment processed", payment, 201);
    } catch (err) {
      next(err);
    }
  }

  async getPaymentStatus(req, res, next) {
    try {
      const payment = await paymentService.getPaymentStatus(req.params.id);
      return ApiResponse.success(res, "Payment status fetched", payment);
    } catch (err) {
      next(err);
    }
  }

  async getUserPayments(req, res, next) {
    try {
      const payments = await paymentService.getUserPayments(req.user.id);
      return ApiResponse.success(res, "Payment history fetched", payments);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new PaymentController();