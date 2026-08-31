const jwt = require("jsonwebtoken");
const jwtConfig = require("../../config/jwtConfig");
const ApiResponse = require("../utils/apiResponse");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return ApiResponse.error(res, "Access denied. No token provided.", 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, jwtConfig.secret);
    req.user = decoded; // { id, email, role }
    next();
  } catch (error) {
    return ApiResponse.error(res, "Invalid or expired token.", 401);
  }
};

const isAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return ApiResponse.error(res, "Access denied. Admins only.", 403);
  }
  next();
};

module.exports = { verifyToken, isAdmin };