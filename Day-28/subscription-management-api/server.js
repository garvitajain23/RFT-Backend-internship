const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const connectDB = require("./config/db");
const errorHandler = require("./shared/utils/errorHandler");

// Service routers (each service = its own microservice-style module)
const userRoutes = require("./services/user-service/routes/user.routes");
const planRoutes = require("./services/plan-service/routes/plan.routes");
const subscriptionRoutes = require("./services/subscription-service/routes/subscription.routes");
const paymentRoutes = require("./services/payment-service/routes/payment.routes");
const notificationRoutes = require("./services/notification-service/routes/notification.routes");
const adminRoutes = require("./services/admin-service/routes/admin.routes");

// Cron job for expiry notifications
require("./services/notification-service/jobs/expiryCron.job");

const app = express();

// Global middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Connect DB
connectDB();

// Mount each "microservice" under its own base path (API Gateway style)
app.use("/api/users", userRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.json({ success: true, message: "Subscription Management API is running 🚀" });
});

// Global error handler (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});