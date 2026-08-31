require("dotenv").config({ path: require("path").resolve(__dirname, "../../.env") });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const authRoutes = require("./authRoutes");
const createServiceLogger = require("../../shared/logger");

const app = express();
const logger = createServiceLogger("AUTH-SERVICE");

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);

app.get("/health", (req, res) =>
  res.json({ status: "Auth Service Running", port: process.env.AUTH_SERVICE_PORT })
);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    logger.info("Auth Service connected to MongoDB");
    app.listen(process.env.AUTH_SERVICE_PORT, () =>
      logger.info(`Auth Service running on port ${process.env.AUTH_SERVICE_PORT}`)
    );
  })
  .catch((err) => logger.error("MongoDB error: " + err.message));