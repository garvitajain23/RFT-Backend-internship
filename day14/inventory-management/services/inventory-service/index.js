require("dotenv").config();
const express = require("express");
const inventoryRoutes = require("./routes/inventoryRoutes");

const app = express();
app.use(express.json());

app.use("/inventory", inventoryRoutes);
app.get("/health", (req, res) => res.json({ status: "Inventory Service OK" }));

const PORT = process.env.INVENTORY_SERVICE_PORT || 2002;
app.listen(PORT, () =>
  console.log(`🏭 Inventory Service running on port ${PORT}`),
);
