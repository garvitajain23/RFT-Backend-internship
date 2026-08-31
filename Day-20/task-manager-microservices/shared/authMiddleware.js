const axios = require("axios");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer "))
      return res.status(401).json({ success: false, message: "No token provided" });

    const token = authHeader.split(" ")[1];

    const { data } = await axios.post(
      `${process.env.AUTH_SERVICE_URL}/api/auth/verify`,
      { token }
    );

    if (!data.success)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    req.user = data.user;
    next();
  } catch (err) {
    res.status(401).json({ success: false, message: "Token verification failed" });
  }
};