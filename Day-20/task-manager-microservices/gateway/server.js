require("dotenv").config({ path: "./.env" });
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const createServiceLogger = require("../shared/logger");

const authRoutes = require("./authRoutes");
const taskRoutes = require("./taskRoutes");
const userRoutes = require("./userRoutes");

const app = express();
const logger = createServiceLogger("GATEWAY");

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Rate limiting
app.use(rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 900000,
  max:      Number(process.env.RATE_LIMIT_MAX) || 100,
  message:  { success: false, message: "Too many requests" },
}));

// All routes go through gateway
app.use("/api/auth",  authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

app.get("/health", (req, res) =>
  res.json({ status: "Gateway Running", port: process.env.GATEWAY_PORT })
);

app.listen(process.env.GATEWAY_PORT, () =>
  logger.info(`Gateway running on port ${process.env.GATEWAY_PORT}`)
);