require("dotenv").config({
  path: require("path").resolve(__dirname, "../../.env"),
});
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const orderRoutes = require("./routes/order.routes");

const app = express();
const PORT = process.env.ORDER_PORT || 3003;

app.use(cors());
app.use(express.json());

app.use("/api/orders", orderRoutes);

app.get("/health", (req, res) => {
  res.json({ service: "Order Service", status: "running", port: PORT });
});

mongoose
  .connect(process.env.ORDER_MONGO_URI)
  .then(() => {
    console.log("✅ Order DB connected");
    app.listen(PORT, () =>
      console.log(`🚀 Order Service running on port ${PORT}`),
    );
  })
  .catch((err) => console.error("❌ DB connection error:", err.message));
