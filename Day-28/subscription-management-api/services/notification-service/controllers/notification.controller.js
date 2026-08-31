const notificationService = require("../services/notification.service");
const ApiResponse = require("../../../shared/utils/apiResponse");

class NotificationController {
  async triggerExpiryCheck(req, res, next) {
    try {
      const count = await notificationService.sendExpiryReminders();
      return ApiResponse.success(res, `Expiry reminders sent to ${count} user(s)`);
    } catch (err) {
      next(err);
    }
  }

  async sendCustom(req, res, next) {
    try {
      const { to, subject, message } = req.body;
      await notificationService.sendCustomNotification({ to, subject, message });
      return ApiResponse.success(res, "Notification sent successfully");
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new NotificationController();