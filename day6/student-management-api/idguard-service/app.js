const express = require("express");
const app = express();

app.use(express.json());

const idguardRoutes = require("./idguard.routes");
app.use("/", idguardRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ success: true, service: "idguard-service", status: "running" });
});

module.exports = app;
