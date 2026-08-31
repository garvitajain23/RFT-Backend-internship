const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const statusCode = err.message === 'URL not found' ? 404 : 400;

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Something went wrong',
  });
};

module.exports = errorHandler;