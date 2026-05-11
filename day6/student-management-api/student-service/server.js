const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const express = require("express");
const connectDB = require("./db");
const studentRoutes = require("./student.routes");

const app = express();
const PORT = process.env.STUDENT_SERVICE_PORT || 6001;

app.use(express.json());
app.use("/students", studentRoutes);

app.get("/health", (req, res) => {
  res.json({ success: true, service: "student-service", status: "running" });
});

const start = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Student Service running on port ${PORT}`);
  });
};

start();
