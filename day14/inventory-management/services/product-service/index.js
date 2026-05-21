require("dotenv").config();
const express = require("express");
const productRoutes = require("./routes/productRoutes");

const app = express();
app.use(express.json());

app.use("/products", productRoutes);

// Health check — gateway pings this to know the service is alive
app.get("/health", (req, res) => res.json({ status: "Product Service OK" }));

const PORT = process.env.PRODUCT_SERVICE_PORT || 2001;
app.listen(PORT, () =>
  console.log(`📦 Product Service running on port ${PORT}`),
);
