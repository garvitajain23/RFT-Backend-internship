const express = require("express");
const app = express();

app.use(express.json());

const validateRoutes = require("./validate.routes");
app.use("/", validateRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ success: true, service: "validate-service", status: "running" });
});

module.exports = app;
