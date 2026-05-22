require("dotenv").config();
const express = require("express");
const postRoutes = require("./post.routes");

const app = express();
app.use(express.json());

app.use("/posts", postRoutes);

const PORT = process.env.POSTS_PORT || 2003;
app.listen(PORT, () => console.log(`Posts service running on port ${PORT}`));
