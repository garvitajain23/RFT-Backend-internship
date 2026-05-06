const express = require("express");
const userRoutes = require("./routes/user.routes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "UP", service: "user-service" });
});

app.use("/users", userRoutes);
app.use(errorHandler);

module.exports = app;
