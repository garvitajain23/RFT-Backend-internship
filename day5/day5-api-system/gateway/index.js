require("dotenv").config();
const express = require("express");
const cors = require("cors");
const gatewayAxios = require("./axiosInstance");

const app = express();
app.use(express.json());

// CORS — allow frontend (React etc.) to talk to gateway
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);

// Gateway-level logging
app.use((req, res, next) => {
  console.log(`\n[GATEWAY] ${req.method} ${req.url}`);
  next();
});

// ─────────────────────────────────────────
// /hello → Hello Service :2001
// ─────────────────────────────────────────
app.get("/hello", async (req, res) => {
  try {
    const response = await gatewayAxios.get(
      `${process.env.HELLO_SERVICE}/hello`,
      { params: req.query }, // forwards ?name=Aryan
    );
    res.status(200).json(response.data);
  } catch (err) {
    res.status(err.status || 500).json({ success: false, error: err.message });
  }
});

// ─────────────────────────────────────────
// /calculate → Calc Service :2002
// ─────────────────────────────────────────
app.get("/calculate", async (req, res) => {
  try {
    const response = await gatewayAxios.get(
      `${process.env.CALC_SERVICE}/calculate`,
      { params: req.query }, // forwards ?num1=10&num2=5&operation=add
    );
    res.status(200).json(response.data);
  } catch (err) {
    res.status(err.status || 500).json({ success: false, error: err.message });
  }
});

// ─────────────────────────────────────────
// /users → User Service :2003
// ─────────────────────────────────────────
app.get("/users", async (req, res) => {
  try {
    const response = await gatewayAxios.get(
      `${process.env.USER_SERVICE}/users`,
    );
    res.status(200).json(response.data);
  } catch (err) {
    res.status(err.status || 500).json({ success: false, error: err.message });
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const response = await gatewayAxios.get(
      `${process.env.USER_SERVICE}/users/${req.params.id}`,
    );
    res.status(200).json(response.data);
  } catch (err) {
    res.status(err.status || 500).json({ success: false, error: err.message });
  }
});

// ─────────────────────────────────────────
// /quote → Quote Service :2004
// ─────────────────────────────────────────
app.get("/quote", async (req, res) => {
  try {
    const response = await gatewayAxios.get(
      `${process.env.QUOTE_SERVICE}/quote`,
    );
    res.status(200).json(response.data);
  } catch (err) {
    res.status(err.status || 500).json({ success: false, error: err.message });
  }
});

app.get("/quote/all", async (req, res) => {
  try {
    const response = await gatewayAxios.get(
      `${process.env.QUOTE_SERVICE}/quote/all`,
    );
    res.status(200).json(response.data);
  } catch (err) {
    res.status(err.status || 500).json({ success: false, error: err.message });
  }
});

// ─────────────────────────────────────────
// BONUS — /dashboard combines ALL services
// ─────────────────────────────────────────
app.get("/dashboard", async (req, res) => {
  try {
    // Calls all 4 services SIMULTANEOUSLY with Promise.all
    const [helloRes, calcRes, usersRes, quoteRes] = await Promise.all([
      gatewayAxios.get(`${process.env.HELLO_SERVICE}/hello`),
      gatewayAxios.get(`${process.env.CALC_SERVICE}/calculate`, {
        params: { num1: 10, num2: 5, operation: "add" },
      }),
      gatewayAxios.get(`${process.env.USER_SERVICE}/users`),
      gatewayAxios.get(`${process.env.QUOTE_SERVICE}/quote`),
    ]);

    res.status(200).json({
      success: true,
      dashboard: {
        greeting: helloRes.data.data,
        sampleCalc: calcRes.data.data,
        users: usersRes.data.data,
        quoteOfTheDay: quoteRes.data.data,
      },
    });
  } catch (err) {
    res.status(err.status || 500).json({ success: false, error: err.message });
  }
});

// Gateway root
app.get("/", (req, res) => {
  res.json({
    message: "🚀 API Gateway is running",
    availableRoutes: [
      "/hello",
      "/calculate",
      "/users",
      "/users/:id",
      "/quote",
      "/quote/all",
      "/dashboard",
    ],
  });
});

// 404
app.use((req, res) => {
  res.status(404).json({ success: false, error: "Unknown route in Gateway" });
});

const PORT = process.env.PORT || 2000;
app.listen(PORT, () =>
  console.log(`✅ API Gateway running on http://localhost:${PORT}`),
);
