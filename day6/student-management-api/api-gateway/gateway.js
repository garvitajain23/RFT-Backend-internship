const { createProxyMiddleware } = require("http-proxy-middleware");
require("dotenv").config({
  path: require("path").resolve(__dirname, "../.env"),
});

const studentServiceProxy = createProxyMiddleware({
  target: process.env.STUDENT_SERVICE_URL,
  changeOrigin: true,
});

const validateServiceProxy = createProxyMiddleware({
  target: process.env.VALIDATE_SERVICE_URL,
  changeOrigin: true,
});

const idguardServiceProxy = createProxyMiddleware({
  target: process.env.IDGUARD_SERVICE_URL,
  changeOrigin: true,
});

module.exports = {
  studentServiceProxy,
  validateServiceProxy,
  idguardServiceProxy,
};
