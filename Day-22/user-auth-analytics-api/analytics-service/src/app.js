const express = require("express");
const cors = require("cors");
const analyticsRoutes = require("./analytics.routes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/analytics", analyticsRoutes);
app.get("/health", (req, res) => res.json({ service: "analytics-service", status: "OK" }));

module.exports = app;