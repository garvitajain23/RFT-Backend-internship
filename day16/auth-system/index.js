const express = require("express");
const { PORT } = require("./config/config");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api", authRoutes);

// Home
app.get("/", (req, res) => {
  res.send("Auth server is running!");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
