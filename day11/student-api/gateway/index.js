require("dotenv").config({
  path: require("path").resolve(__dirname, "../.env"),
});
// load from root .env

const express = require("express");
const axios = require("axios");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const PORT = process.env.GATEWAY_PORT || 2000;

// ── Service URLs (loaded from .env) ──────────────────────────────────────────
const STUDENT_SERVICE_URL =
  process.env.STUDENT_SERVICE_URL || "http://localhost:2001";

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// ── Gateway Health Check ──────────────────────────────────────────────────────
app.get("/health", (req, res) => {
  res.status(200).json({
    service: "api-gateway",
    status: "running",
    port: PORT,
    time: new Date().toISOString(),
  });
});

/**
 * GATEWAY FORWARDER
 * ─────────────────
 * This function:
 *   1. Receives a request at the gateway (port 2000)
 *   2. Builds the target URL for the correct microservice
 *   3. Forwards the request via Axios (with body + query params)
 *   4. Returns the service's response back to the client
 *   5. Handles service-down errors gracefully
 */
const forwardRequest = (serviceUrl) => async (req, res) => {
  try {
    // Build full target URL e.g. http://localhost:2001/students/123?page=1
    const targetUrl = `${serviceUrl}${req.originalUrl}`;

    console.log(
      `🔀  Gateway forwarding: ${req.method} ${req.originalUrl} → ${targetUrl}`,
    );

    const response = await axios({
      method: req.method,
      url: targetUrl,
      data: req.body, // forward request body (POST/PUT)
      params: req.query, // forward query params (?page=1&limit=5)
      headers: {
        "Content-Type": "application/json",
      },
      // If the service takes longer than 10s, fail fast
      timeout: 10000,
    });

    // Send back exactly what the service responded with
    return res.status(response.status).json(response.data);
  } catch (err) {
    // Axios wraps HTTP error responses (4xx, 5xx) in err.response
    if (err.response) {
      // Service responded with an error (404, 400, 409 etc.)
      return res.status(err.response.status).json(err.response.data);
    }

    // Service is completely unreachable (not started, crashed)
    if (err.code === "ECONNREFUSED" || err.code === "ERR_NETWORK") {
      return res.status(503).json({
        success: false,
        message: "Service unavailable. Please try again later.",
        service: serviceUrl,
      });
    }

    // Request timed out
    if (err.code === "ECONNABORTED") {
      return res.status(504).json({
        success: false,
        message: "Service did not respond in time (timeout).",
      });
    }

    console.error("❌  Gateway error:", err.message);
    return res.status(500).json({
      success: false,
      message: "Internal gateway error",
    });
  }
};

// ── Route Mappings ────────────────────────────────────────────────────────────
//
//  All /students/* requests → Student Service (port 2001)
//
//  When you add more services later, just add more lines:
//  app.all("/auth/*",    forwardRequest(AUTH_SERVICE_URL));
//  app.all("/courses/*", forwardRequest(COURSE_SERVICE_URL));
//
app.all("/students", forwardRequest(STUDENT_SERVICE_URL));
app.all("/students/:path", forwardRequest(STUDENT_SERVICE_URL));

// ── 404 — No matching route in gateway ───────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} does not exist on this gateway`,
    availableRoutes: ["/students", "/students/:id", "/health"],
  });
});

// ── Start Gateway ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚪  API Gateway running on http://localhost:${PORT}`);
  console.log(`🔗  Student Service → ${STUDENT_SERVICE_URL}`);
});
