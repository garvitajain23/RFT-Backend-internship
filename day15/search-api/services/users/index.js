require("dotenv").config();
const express = require("express");
const userRoutes = require("./user.routes");

const app = express();
app.use(express.json());

app.use("/users", userRoutes);

const PORT = process.env.USERS_PORT || 2002;
app.listen(PORT, () => console.log(`Users service running on port ${PORT}`));
