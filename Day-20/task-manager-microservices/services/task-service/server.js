require("dotenv").config({ path: require("path").resolve(__dirname, "../../.env") });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const taskRoutes = require("./taskRoutes");
const createServiceLogger = require("../../shared/logger");

const app = express();
const logger = createServiceLogger("TASK-SERVICE");

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/tasks", taskRoutes);

app.get("/health", (req, res) =>
  res.json({ status: "Task Service Running", port: process.env.TASK_SERVICE_PORT })
);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    logger.info("Task Service connected to MongoDB");
    app.listen(process.env.TASK_SERVICE_PORT, () =>
      logger.info(`Task Service running on port ${process.env.TASK_SERVICE_PORT}`)
    );
  })
  .catch((err) => logger.error("MongoDB error: " + err.message));