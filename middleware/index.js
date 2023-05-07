// import
const errorHandler = require('./error.middleware');
const corsHandler = require('./cors.middleware');
const notfoundHandler = require('./notfound.middleware');

module.exports = {
  errorHandler,
  corsHandler,
  notfoundHandler,
};
