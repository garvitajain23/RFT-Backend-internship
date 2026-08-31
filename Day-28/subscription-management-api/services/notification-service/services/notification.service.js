const sendEmail = require("../utils/emailSender");
const subscriptionService = require("../../subscription-service/services/subscription.service");

class NotificationService {
  async sendExpiryReminders() {
    const expiringSubs = await subscriptionService.getExpiringSubscriptions(3);

    for (const sub of expiringSubs) {
      await sendEmail({
        to: sub.user.email,
        subject: "Your subscription is expiring soon!",
        text: `Hi ${sub.user.name}, your "${sub.plan.name}" plan expires on ${sub.endDate.toDateString()}. Renew now to avoid interruption.`,
      });
    }

    return expiringSubs.length;
  }

  async sendCustomNotification({ to, subject, message }) {
    await sendEmail({ to, subject, text: message });
    return true;
  }
}

module.exports = new NotificationService();