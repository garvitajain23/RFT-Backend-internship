const User = require("./User");
const bcrypt = require("bcryptjs");
const { validateRegister } = require("./validate");

// POST /register
const register = async (req, res) => {
  const { email, password } = req.body;

  // Validate inputs
  const errors = validateRegister(email, password);
  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  try {
    // Check for duplicate user (BONUS)
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const user = new User({ email, password: hashedPassword });
    await user.save();

    res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

// POST /login
const login = async (req, res) => {
  const { email, password } = req.body;

  // Validate inputs
  const errors = validateRegister(email, password);
  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  try {
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    res
      .status(200)
      .json({ success: true, message: "Login successful", userId: user._id });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

module.exports = { register, login };
