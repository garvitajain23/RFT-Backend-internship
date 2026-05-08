require("dotenv").config();
const express = require("express");
const app = express();
const quoteRoutes = require("./routes/quote.routes");

app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use("/quote", quoteRoutes);

app.use((req, res) => {
  res
    .status(404)
    .json({ success: false, error: "Route not found on Quote Service" });
});

const PORT = process.env.PORT || 2004;
app.listen(PORT, () =>
  console.log(`✅ Quote Service running on http://localhost:${PORT}`),
);
