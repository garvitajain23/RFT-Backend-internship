require("dotenv").config();
const express = require("express");
const app = express();
const userRoutes = require("./routes/user.routes");

app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use("/users", userRoutes);

app.use((req, res) => {
  res
    .status(404)
    .json({ success: false, error: "Route not found on User Service" });
});

const PORT = process.env.PORT || 2003;
app.listen(PORT, () =>
  console.log(`✅ User Service running on http://localhost:${PORT}`),
);
