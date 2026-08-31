require("dotenv").config({ path: require("path").resolve(__dirname, "../../.env") });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const userRoutes = require("./userRoutes");
const createServiceLogger = require("../../shared/logger");

const app = express();
const logger = createServiceLogger("USER-SERVICE");

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/users", userRoutes);

app.get("/health", (req, res) =>
  res.json({ status: "User Service Running", port: process.env.USER_SERVICE_PORT })
);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    logger.info("User Service connected to MongoDB");
    app.listen(process.env.USER_SERVICE_PORT, () =>
      logger.info(`User Service running on port ${process.env.USER_SERVICE_PORT}`)
    );
  })
  .catch((err) => logger.error("MongoDB error: " + err.message));