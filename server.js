// require
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const http = require('http');
const socketIO = require('socket.io');

// socket setup
const server = http.createServer(app);
const io = socketIO(server);

// local modules
const {
  errorHandler,
  notfoundHandler,
  socketHandler,
} = require('./middleware');
const router = require('./routes');
const limiter = require('./config/limiter');

// swagger setup
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const YAML = require('yaml');

// environments
const file = fs.readFileSync('./docs.yaml', 'utf8');
const swaggerDocument = YAML.parse(file);

// middlewares
app.use(express.json());
app.use(cors());

// middleware logs
app.use(morgan('combined'));

// middlewares routes
app.use(limiter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); // api docs swagger
app.use(router);

// socket auth
// Middleware untuk Socket.IO
io.use(socketHandler);

// socket
io.on('connection', (socket) => {
  console.log('User connected: ' + socket.id);

  // Tangani event saat driver mengirim notification
  socket.on('notification', (data) => {
    // Mengirimkan data notification ke user (kecuali admin)
    const { username, userId } = socket.userData;
    const modifiedData = {
      ...data,
      userId,
      created_by: username,
    };

    // broadcast
    socket.broadcast.emit('getNotification', modifiedData);
  });

  // Tangani event saat user terputus
  socket.on('disconnect', () => {
    console.log('User disconnect: ' + socket.id);
  });
});

// middleware error
app.use(errorHandler);
app.use(notfoundHandler);

// listen app
server.listen(process.env.PORT || 8080, () => {
  console.log(`running on http://localhost:${process.env.PORT}`);
});
