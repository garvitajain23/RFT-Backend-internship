require("dotenv").config();
const express = require("express");
const productRoutes = require("./product.routes");

const app = express();
app.use(express.json());

app.use("/products", productRoutes);

const PORT = process.env.PRODUCTS_PORT || 2001;
app.listen(PORT, () => console.log(`Products service running on port ${PORT}`));
