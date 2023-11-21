import jwt from 'jsonwebtoken';
//const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SEED || 'tuClaveSecreta'; // Puedes usar una clave en tu entorno o una predeterminada

function signToken(payload) {
  return jwt.sign(payload, secretKey, { expiresIn: '6h' });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    return null;
  }
}

export default { signToken, verifyToken };



