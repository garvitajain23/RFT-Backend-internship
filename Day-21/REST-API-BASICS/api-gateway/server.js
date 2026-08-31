import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env") });

console.log("GATEWAY_PORT:", process.env.GATEWAY_PORT);
console.log("STUDENT_SERVICE_URL:", process.env.STUDENT_SERVICE_URL);

const app = express();
const PORT = process.env.GATEWAY_PORT || 5000;
const STUDENT_SERVICE_URL = process.env.STUDENT_SERVICE_URL;

app.use(cors());
app.use(express.json());

app.get("/students", async (req, res) => {
  try {
    const response = await fetch(`${STUDENT_SERVICE_URL}/students`);
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    console.error("❌ Gateway error (GET /students):", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.get("/students/:id", async (req, res) => {
  try {
    const response = await fetch(`${STUDENT_SERVICE_URL}/students/${req.params.id}`);
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    console.error("❌ Gateway error (GET /students/:id):", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.post("/students", async (req, res) => {
  try {
    const response = await fetch(`${STUDENT_SERVICE_URL}/students`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    console.error("❌ Gateway error (POST /students):", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.put("/students/:id", async (req, res) => {
  try {
    const response = await fetch(`${STUDENT_SERVICE_URL}/students/${req.params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    console.error("❌ Gateway error (PUT /students/:id):", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.delete("/students/:id", async (req, res) => {
  try {
    const response = await fetch(`${STUDENT_SERVICE_URL}/students/${req.params.id}`, {
      method: "DELETE"
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    console.error("❌ Gateway error (DELETE /students/:id):", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚪 API Gateway running on http://localhost:${PORT}`);
});