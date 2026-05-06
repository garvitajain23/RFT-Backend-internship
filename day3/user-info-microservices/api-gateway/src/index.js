require("dotenv").config();
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
app.use(express.json());

const USER_SERVICE = process.env.USER_SERVICE_URL;

// ─── Route Table ───────────────────────────────────────
//  /users  →  user-service (port 4001)
// ───────────────────────────────────────────────────────

app.use(
  "/users",
  createProxyMiddleware({
    target: USER_SERVICE,
    changeOrigin: true,
    on: {
      error: (err, req, res) => {
        res.status(502).json({
          success: false,
          error: "User Service unavailable",
          details: err.message,
        });
      },
    },
  }),
);

// Gateway health check
app.get("/health", (req, res) => {
  res.json({
    status: "UP",
    service: "api-gateway",
    routes: {
      users: USER_SERVICE,
    },
  });
});

// 404 for unknown routes
app.use((req, res) => {
  res.status(404).json({ success: false, error: "Route not found" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚪 API Gateway running on http://localhost:${PORT}`);
});
