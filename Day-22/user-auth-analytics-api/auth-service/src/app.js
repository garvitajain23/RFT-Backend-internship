const express = require("express");
const cors = require("cors");
const authRoutes = require("./auth.routes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.get("/health", (req, res) => res.json({ service: "auth-service", status: "OK" }));

module.exports = app;