const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    service: "user-service",
    error: err.message || "Internal Server Error",
  });
};

module.exports = errorHandler;
