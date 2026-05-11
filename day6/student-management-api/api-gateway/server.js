const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const PORT = process.env.GATEWAY_PORT || 6000;

app.use(
  "/students",
  createProxyMiddleware({
    target: "http://localhost:6001",
    changeOrigin: true,
  }),
);

app.use(
  "/validate",
  createProxyMiddleware({
    target: "http://localhost:6002",
    changeOrigin: true,
  }),
);

app.use(
  "/check-id",
  createProxyMiddleware({
    target: "http://localhost:6003",
    changeOrigin: true,
  }),
);

app.get("/health", (req, res) => {
  res.json({ success: true, service: "api-gateway", status: "running" });
});

app.listen(PORT, () => {
  console.log(`🚀 API Gateway running on port ${PORT}`);
  console.log(`📡 Routing:`);
  console.log(`   /students  → Student Service :6001`);
  console.log(`   /validate  → Validate Service :6002`);
  console.log(`   /check-id  → IDGuard Service :6003`);
});
