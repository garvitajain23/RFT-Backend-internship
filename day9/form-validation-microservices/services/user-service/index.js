const express = require("express");
require("dotenv").config();
const userRoute = require("./routes/userRoute");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 9001;

app.use("/api/user", userRoute);

app.get("/health", (req, res) => {
  res.json({ status: "User Service running", port: PORT });
});

app.listen(PORT, () => {
  console.log(`👤 User Service running on http://localhost:${PORT}`);
});
