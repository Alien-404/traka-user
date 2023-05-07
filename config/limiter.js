const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 30000, // 30 detik
  max: 50, // maksimal 10 request dalam 30 detik
  message: 'Too many requests from this IP, please try again after 30 seconds',
});

module.exports = limiter;
