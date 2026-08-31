const cron = require("node-cron");
const notificationService = require("../services/notification.service");
const subscriptionService = require("../../subscription-service/services/subscription.service");

// Runs every day at 8:00 AM server time
cron.schedule("0 8 * * *", async () => {
  console.log("⏰ Running daily expiry check job...");
  try {
    await subscriptionService.markExpiredSubscriptions();
    const count = await notificationService.sendExpiryReminders();
    console.log(`✅ Expiry job done. Reminders sent: ${count}`);
  } catch (error) {
    console.error("❌ Expiry cron job failed:", error.message);
  }
});

module.exports = {}; // just needs to be required once in server.js to register the job