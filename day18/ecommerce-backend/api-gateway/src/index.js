require("dotenv").config({
  path: require("path").resolve(__dirname, "../../.env"),
});
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");

const app = express();
const PORT = process.env.GATEWAY_PORT || 3000;

app.use(cors());
app.use(express.json());

// ── Route → Service Mapping ──────────────────────────────
app.use(
  "/api/products",
  createProxyMiddleware({
    target: process.env.PRODUCT_SERVICE_URL,
    changeOrigin: true,
  }),
);

app.use(
  "/api/cart",
  createProxyMiddleware({
    target: process.env.CART_SERVICE_URL,
    changeOrigin: true,
  }),
);

app.use(
  "/api/orders",
  createProxyMiddleware({
    target: process.env.ORDER_SERVICE_URL,
    changeOrigin: true,
  }),
);

// Gateway health check
app.get("/health", (req, res) => {
  res.json({
    service: "API Gateway",
    status: "running",
    port: PORT,
    routes: {
      products: process.env.PRODUCT_SERVICE_URL,
      cart: process.env.CART_SERVICE_URL,
      orders: process.env.ORDER_SERVICE_URL,
    },
  });
});

app.listen(PORT, () => {
  console.log(`🌐 API Gateway running on port ${PORT}`);
  console.log(`   /api/products → ${process.env.PRODUCT_SERVICE_URL}`);
  console.log(`   /api/cart     → ${process.env.CART_SERVICE_URL}`);
  console.log(`   /api/orders   → ${process.env.ORDER_SERVICE_URL}`);
});
