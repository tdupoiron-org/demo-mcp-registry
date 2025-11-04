// Centralized error handling middleware

const errorHandler = (err, req, res, next) => {
  // Log the error
  console.error('Error:', err);

  // Determine status code
  const statusCode = err.statusCode || 500;

  // Determine error message
  const message = err.message || 'Internal Server Error';

  // Send error response
  res.status(statusCode).json({
    error: {
      name: err.name || 'Error',
      message: message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    },
  });
};

module.exports = errorHandler;
