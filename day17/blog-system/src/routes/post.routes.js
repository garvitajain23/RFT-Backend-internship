const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth.middleware");
const {
  createPost,
  getAllPosts,
  getPostsByUser,
  updatePost,
  deletePost,
} = require("../controllers/post.controller");

router.get("/", getAllPosts); // Public
router.get("/user/:userId", getPostsByUser); // Public
router.post("/", protect, createPost); // 🔐 Auth required
router.put("/:id", protect, updatePost); // 🔐 Auth required
router.delete("/:id", protect, deletePost); // 🔐 Auth required

module.exports = router;
