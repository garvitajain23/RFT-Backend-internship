const express = require("express");
const cors = require("cors");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
app.use(cors());

const logToAnalytics = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    try {
      const decoded = jwt.decode(authHeader.split(" ")[1]);
      if (decoded) {
        axios
          .post(`${process.env.ANALYTICS_SERVICE_URL}/api/analytics/log`, {
            userId: decoded.id,
            email: decoded.email,
            method: req.method,
            endpoint: req.originalUrl,
            statusCode: res.statusCode,
            ip: req.ip,
          })
          .catch(() => {});
      }
    } catch (e) {}
  }
  next();
};

app.use(logToAnalytics);

app.use(
  "/api/auth",
  createProxyMiddleware({
    target: process.env.AUTH_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: (path) => "/api/auth" + path,
  })
);

app.use(
  "/api/users",
  createProxyMiddleware({
    target: process.env.USER_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: (path) => "/api/users" + path,
  })
);

app.use(
  "/api/analytics",
  createProxyMiddleware({
    target: process.env.ANALYTICS_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: (path) => "/api/analytics" + path,
  })
);

app.get("/health", (req, res) => res.json({ service: "api-gateway", status: "OK" }));

module.exports = app;