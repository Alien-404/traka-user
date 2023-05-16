// import
const errorHandler = require('./error.middleware');
const corsHandler = require('./cors.middleware');
const notfoundHandler = require('./notfound.middleware');
const authHandler = require('./auth.middleware');
const socketHandler = require('./socket.middleware');

module.exports = {
  errorHandler,
  corsHandler,
  notfoundHandler,
  authHandler,
  socketHandler,
};
