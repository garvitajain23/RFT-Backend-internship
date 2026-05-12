require("dotenv").config();
const express = require("express");
const cors = require("cors");
const taskRoutes = require("./routes/task.routes");

const app = express();
const PORT = process.env.TASKS_SERVICE_PORT || 7001;

app.use(cors());
app.use(express.json());

// Mount routes
app.use("/tasks", taskRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Tasks Service is running ✅", port: PORT });
});

app.listen(PORT, () => {
  console.log(`📋 Tasks Service running on http://localhost:${PORT}`);
});
