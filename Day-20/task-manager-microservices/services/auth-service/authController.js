const jwt = require("jsonwebtoken");
const User = require("./userModel");
const createServiceLogger = require("../../shared/logger");
const logger = createServiceLogger("AUTH-CONTROLLER");

const generateToken = (user) =>
  jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ success: false, message: "Email already registered" });

    const user = await User.create({ name, email, password, role });
    const token = generateToken(user);
    logger.info(`Registered: ${email}`);
    res.status(201).json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    // ✅ Log full error
    logger.error("Register error: " + err.message);
    console.error(err); // ← add this line
    res.status(500).json({ success: false, message: err.message }); // ← return actual message
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    if (!user.isActive)
      return res.status(403).json({ success: false, message: "Account deactivated" });

    const token = generateToken(user);
    logger.info(`Login: ${email}`);
    res.json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Internal route called by shared/authMiddleware.js via Axios
exports.verifyToken = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token)
      return res.status(400).json({ success: false, message: "Token required" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    res.json({ success: true, user });
  } catch (err) {
    res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};