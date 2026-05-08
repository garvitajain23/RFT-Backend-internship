const axios = require("axios");

// Create a custom axios instance
const gatewayAxios = axios.create({
  timeout: 5000, // ⏱ All requests timeout after 5 seconds automatically
});

// ✅ REQUEST INTERCEPTOR
// Runs before EVERY request the gateway sends to any service
gatewayAxios.interceptors.request.use((config) => {
  // Automatically attach secret key to every outgoing request
  config.headers["x-internal-secret"] = process.env.INTERNAL_SECRET;
  config.headers["x-forwarded-from"] = "api-gateway";

  console.log(`[Axios ➡] Sending to → ${config.url}`);
  return config; // must return config or request won't go through
});

// ✅ RESPONSE INTERCEPTOR
// Runs after EVERY response comes back from any service
gatewayAxios.interceptors.response.use(
  (response) => {
    // Success path
    console.log(
      `[Axios ✅] Response from ${response.config.url} | Status: ${response.status}`,
    );
    return response;
  },
  (error) => {
    // Error path — centralized error handling for ALL services
    const url = error.config?.url || "unknown";

    if (error.code === "ECONNABORTED") {
      console.error(`[Axios ⏱] TIMEOUT → ${url}`);
      return Promise.reject({ status: 504, message: "Service timed out" });
    }

    if (error.code === "ECONNREFUSED") {
      console.error(`[Axios 🔴] SERVICE DOWN → ${url}`);
      return Promise.reject({
        status: 503,
        message: "Service is currently unavailable",
      });
    }

    console.error(`[Axios ❌] Error from ${url}: ${error.message}`);
    return Promise.reject({
      status: error.response?.status || 500,
      message: error.message,
    });
  },
);

module.exports = gatewayAxios;
