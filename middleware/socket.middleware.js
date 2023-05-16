const jwt = require('jsonwebtoken');
// environments
const { SECRET_KEY } = process.env;

const socketAuth = (socket, next) => {
  const token = socket.handshake.auth.token;

  // Verifikasi token
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return next(new Error('Autentikasi gagal'));
    }

    // Simpan data terkait dengan token di dalam objek socket
    socket.userData = {
      userId: decoded.uuid,
      username: decoded.name,
    };

    next();
  });
};

module.exports = socketAuth;
