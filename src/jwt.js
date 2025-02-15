import jwt from 'jsonwebtoken';


const secretKey = process.env.JWT_SEED || 'tuClaveSecreta'; 

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



