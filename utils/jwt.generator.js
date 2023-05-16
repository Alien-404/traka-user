const jwt = require('jsonwebtoken');
// environments
const { SECRET_KEY } = process.env;

// Menghasilkan token JWT
const generateToken = (payload) => {
  // Menyertakan data payload yang ingin Anda sertakan dalam token
  const token = jwt.sign(payload, SECRET_KEY);
  return token;
};

// Contoh penggunaan
const userId = 'user-socket-flutter-1';
const username = 'user-socket';

// Menyusun data payload
const payload = {
  uuid: userId,
  name: username,
};

// Membuat token menggunakan payload
const token = generateToken(payload);
console.log('Token JWT: ' + token);
