const Post = require("../models/Post");

// POST /api/posts — Create post (auth required)
exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    const post = await Post.create({
      title,
      content,
      author: req.user._id, // 🔗 Link post to logged-in user
    });

    await post.populate("author", "name email");

    res.status(201).json({ message: "Post created", post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/posts — Fetch all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "name email") // Join user data
      .sort({ createdAt: -1 }); // Newest first

    res.json({ count: posts.length, posts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/posts/user/:userId — Fetch posts by specific user
exports.getPostsByUser = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.params.userId })
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    res.json({ count: posts.length, posts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/posts/:id — Edit post (owner only)
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    // ✅ Ownership check — only owner can edit
    if (post.author.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to edit this post" });
    }

    const updated = await Post.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title, content: req.body.content },
      { new: true, runValidators: true },
    ).populate("author", "name email");

    res.json({ message: "Post updated", post: updated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /api/posts/:id — Delete post (owner only)
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    // ✅ Ownership check — only owner can delete
    if (post.author.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this post" });
    }

    await post.deleteOne();
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
