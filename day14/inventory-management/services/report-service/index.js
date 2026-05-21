require("dotenv").config();
const express = require("express");
const reportRoutes = require("./routes/reportRoutes");

const app = express();
app.use(express.json());

app.use("/reports", reportRoutes);
app.get("/health", (req, res) => res.json({ status: "Report Service OK" }));

const PORT = process.env.REPORT_SERVICE_PORT || 2003;
app.listen(PORT, () =>
  console.log(`📊 Report Service running on port ${PORT}`),
);
