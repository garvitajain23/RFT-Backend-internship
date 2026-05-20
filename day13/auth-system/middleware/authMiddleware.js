const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config/config");

const protect = (req, res, next) => {
  try {
    // Step 1: Get token from request headers
    const authHeader = req.headers.authorization;

    // Step 2: Check if token exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Access denied. No token provided",
      });
    }

    // Step 3: Extract token (remove "Bearer " prefix)
    const token = authHeader.split(" ")[1];

    // Step 4: Verify token
    const decoded = jwt.verify(token, SECRET_KEY);

    // Step 5: Attach user data to request
    req.user = decoded;

    // Step 6: Move on to the actual route
    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

module.exports = { protect };
