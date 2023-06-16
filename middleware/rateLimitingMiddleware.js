const rateLimit = require('express-rate-limit');

// max 5 request per minute limit
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: 'Too many requests, please slow down',
  statusCode:429
});

module.exports = limiter;
