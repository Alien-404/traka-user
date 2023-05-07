const errorHandler = (err, req, res, next) => {
  // Takes the status code of the error, or assumes 500 if it doesn't exist
  const statusCode = err.statusCode || 500;

  // Retrieve error messages
  const message = err.message || 'Internal Server Error';

  // Gets stack trace errors if any
  const stack = err.stack || '';

  // Returns an error response to the client
  res.status(statusCode).json({
    error: {
      status: false,
      message: message,
    },
  });
};

module.exports = errorHandler;
