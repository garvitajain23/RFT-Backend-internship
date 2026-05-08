require("dotenv").config();
const express = require("express");
const app = express();
const helloRoutes = require("./routes/hello.routes");

app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use("/hello", helloRoutes);

// 404 handler
app.use((req, res) => {
  res
    .status(404)
    .json({ success: false, error: "Route not found on Hello Service" });
});

const PORT = process.env.PORT || 2001;
app.listen(PORT, () =>
  console.log(`✅ Hello Service running on http://localhost:${PORT}`),
);
