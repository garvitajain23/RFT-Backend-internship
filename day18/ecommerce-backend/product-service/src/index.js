require("dotenv").config({
  path: require("path").resolve(__dirname, "../../.env"),
}); // points to root .env
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const productRoutes = require("./routes/product.routes");

const app = express();
const PORT = process.env.PRODUCT_PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ service: "Product Service", status: "running", port: PORT });
});

// Connect DB then start server
mongoose
  .connect(process.env.PRODUCT_MONGO_URI)
  .then(() => {
    console.log("✅ Product DB connected");
    app.listen(PORT, () =>
      console.log(`🚀 Product Service running on port ${PORT}`),
    );
  })
  .catch((err) => console.error("❌ DB connection error:", err.message));
