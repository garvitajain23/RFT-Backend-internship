require("dotenv").config({
  path: require("path").resolve(__dirname, "../../.env"),
});
// load from root .env

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

const studentRoutes = require("./routes/student.routes");

const app = express();
const PORT = process.env.STUDENT_SERVICE_PORT || 2001;

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json()); // parse JSON request bodies
app.use(morgan("dev")); // log: GET /students 200 12ms

// ── Routes ───────────────────────────────────────────────────────────────────
app.use("/students", studentRoutes);

// ── Health check (gateway can ping this to confirm service is alive) ─────────
app.get("/health", (req, res) => {
  res.status(200).json({
    service: "student-service",
    status: "running",
    port: PORT,
    time: new Date().toISOString(),
  });
});

// ── 404 handler for unknown routes inside this service ───────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found in student-service`,
  });
});

// ── MongoDB Connection + Start Server ────────────────────────────────────────
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅  MongoDB connected successfully");
    app.listen(PORT, () => {
      console.log(`🎓  Student Service running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌  MongoDB connection failed:", err.message);
    process.exit(1); // crash early — no point running without a DB
  });
