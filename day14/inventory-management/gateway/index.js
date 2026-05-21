require("dotenv").config();
const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const PRODUCT_URL = process.env.PRODUCT_SERVICE_URL;
const INVENTORY_URL = process.env.INVENTORY_SERVICE_URL;
const REPORT_URL = process.env.REPORT_SERVICE_URL;

// ─── Helper: forward any request using axios ───────────────────────────────
async function forward(res, method, url, data = null) {
  try {
    const config = { method, url, data };
    const response = await axios(config);
    res.status(response.status).json(response.data);
  } catch (err) {
    if (err.response) {
      // The microservice returned an error (4xx, 5xx)
      res.status(err.response.status).json(err.response.data);
    } else {
      // Network error — service might be down
      res.status(503).json({
        success: false,
        message: `Service unavailable: ${err.message}`,
      });
    }
  }
}

// ─── Gateway health ─────────────────────────────────────────────────────────
app.get("/health", (req, res) => {
  res.json({ status: "API Gateway OK", port: process.env.GATEWAY_PORT });
});

// ─── PRODUCT ROUTES ─────────────────────────────────────────────────────────
app.get("/api/products", (req, res) =>
  forward(res, "GET", `${PRODUCT_URL}/products`),
);

app.post("/api/products", (req, res) =>
  forward(res, "POST", `${PRODUCT_URL}/products`, req.body),
);

app.delete("/api/products/:id", (req, res) =>
  forward(res, "DELETE", `${PRODUCT_URL}/products/${req.params.id}`),
);

// ─── INVENTORY ROUTES ────────────────────────────────────────────────────────
app.patch("/api/inventory/:id/quantity", (req, res) =>
  forward(
    res,
    "PATCH",
    `${INVENTORY_URL}/inventory/${req.params.id}/quantity`,
    req.body,
  ),
);

app.get("/api/inventory/low-stock", (req, res) =>
  forward(res, "GET", `${INVENTORY_URL}/inventory/low-stock`),
);

// ─── REPORT ROUTES ───────────────────────────────────────────────────────────
app.get("/api/reports/sort-by-price", (req, res) => {
  const order = req.query.order || "ASC";
  forward(res, "GET", `${REPORT_URL}/reports/sort-by-price?order=${order}`);
});

app.get("/api/reports/summary", (req, res) =>
  forward(res, "GET", `${REPORT_URL}/reports/summary`),
);

// ─── 404 Handler ─────────────────────────────────────────────────────────────
app.use((req, res) => {
  res
    .status(404)
    .json({ success: false, message: "Route not found in gateway" });
});

const PORT = process.env.GATEWAY_PORT || 2000;
app.listen(PORT, () => {
  console.log(`🌐 API Gateway running on port ${PORT}`);
  console.log(`   → Product Service  : ${PRODUCT_URL}`);
  console.log(`   → Inventory Service: ${INVENTORY_URL}`);
  console.log(`   → Report Service   : ${REPORT_URL}`);
});
