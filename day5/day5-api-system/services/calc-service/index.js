require("dotenv").config();
const express = require("express");
const app = express();
const calcRoutes = require("./routes/calc.routes");

app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use("/calculate", calcRoutes);

app.use((req, res) => {
  res
    .status(404)
    .json({ success: false, error: "Route not found on Calc Service" });
});

const PORT = process.env.PORT || 2002;
app.listen(PORT, () =>
  console.log(`✅ Calc Service running on http://localhost:${PORT}`),
);
