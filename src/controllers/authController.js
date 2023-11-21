// controllers/authController.js
import Router from 'express';
import { User }from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const authRouter  = Router()


authRouter.post('/login', async (req, res ) => {
  const { email, password} = req.body;

  //Validamos si el usuario existe en la bd
  const user = await User.findOne({ where: { email: email } })

  if (!user) {
    return res.status(400).json({
      msg: "No existe usuario"
    })
  }

  //Validamos password
  const passwordValid = await bcrypt.compare(password, user.password)
  if (!passwordValid) {
    return res.status(400).json({
      msg: "Password Incorrecto"
    })
  }


  // Generamos token
  const token = jwt.sign({
    email: email
  }, process.env.SECRET_KEY || 'pepito123', /* expiresIn: 't en ms' Para que el token expire en un tiempo t */);

  const obj = {
    tok: token,
    us: user,
  };

  res.json(obj);

})


authRouter.post('/register', async (req, res) => {
  console.log('new user entrando');
  const { password, email, name } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);


  //Validacion de si el usuario ya existe en la bd
  let user = await User.findOne({ where: { email: email } })
  if (user) {
    return res.status(400).json({
      msg: `Ya existe un usuario con el mail ${email}`
    })
  }

  try {
   
    await User.create({
      email: email,
      password: hashedPassword,
      name: name,
    });

    res.json({
      msg: ` usuario creado exitosamente`,
    })

  } catch (error) {
    res.status(400).json({
      msg: 'Ocurrio un Error',
      error
    });
  }
}
)


export default authRouter 












export const validateToken = (req, res, next) => {
  const headerToken = req.headers['authorization'];


  if (headerToken != undefined && headerToken.startsWith('Bearer ')) {
    // Tiene Token
    try {
      const bearerToken = headerToken.slice(7);
      jwt.verify(bearerToken, process.env.SECRET_KEY || 'pepito123')

      next()

    } catch (error) {
      res.status(401).json({
        msg: 'Token no valido'
      })
    }

  } else {
    res.status(401).json({
      msg: 'Acceso denegado'
    })
  }
}