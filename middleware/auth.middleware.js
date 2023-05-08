const jwt = require('jsonwebtoken');
// environments
const { SECRET_KEY } = process.env;

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).json({
          status: false,
          message: 'Forbiden Access!',
          data: null,
        });
      }

      req.user = user;
      next();
    });
  } else {
    res.status(401).json({
      status: false,
      message: 'Unauthorized!',
      data: null,
    });
  }
};

module.exports = authMiddleware;
