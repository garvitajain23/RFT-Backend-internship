const express = require("express");
const app = express();

app.use(express.json());

const authRoutes = require("./authRoutes");
app.use("/api", authRoutes);

module.exports = app;
