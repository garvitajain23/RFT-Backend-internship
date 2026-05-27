require("dotenv").config({
  path: require("path").resolve(__dirname, "../../.env"),
});
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cartRoutes = require("./routes/cart.routes");

const app = express();
const PORT = process.env.CART_PORT || 3002;

app.use(cors());
app.use(express.json());

app.use("/api/cart", cartRoutes);

app.get("/health", (req, res) => {
  res.json({ service: "Cart Service", status: "running", port: PORT });
});

mongoose
  .connect(process.env.CART_MONGO_URI)
  .then(() => {
    console.log("✅ Cart DB connected");
    app.listen(PORT, () =>
      console.log(`🚀 Cart Service running on port ${PORT}`),
    );
  })
  .catch((err) => console.error("❌ DB connection error:", err.message));
