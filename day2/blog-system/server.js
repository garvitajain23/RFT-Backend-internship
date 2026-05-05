const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Routes
app.use("/api/auth", require("./src/routes/auth.routes"));
app.use("/api/posts", require("./src/routes/post.routes"));
app.use("/api/comments", require("./src/routes/comment.routes"));

// Health check
app.get("/", (req, res) => {
  res.json({ message: "🚀 Blog API is running" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
