const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth.middleware");
const {
  addComment,
  getComments,
  deleteComment,
} = require("../controllers/comment.controller");

router.post("/:postId", protect, addComment); // 🔐 Auth required
router.get("/:postId", getComments); // Public
router.delete("/:id", protect, deleteComment); // 🔐 Auth required

module.exports = router;
