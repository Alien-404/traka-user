const errorHandler = (err, req, res, next) => {
  // check error type
  console.error(err);
  console.log(err.statusCode);
  if (err.status === 401) {
    res.status(401).json({
      message: 'You are not authorized to access this endpoint',
    });
  } else if (err.status === 404) {
    res.status(404).json({
      message: 'The page you are looking for was not found',
    });
  } else {
    res.status(500).json({
      message: 'An error occurred on the server',
    });
  }
};

module.exports = errorHandler;
