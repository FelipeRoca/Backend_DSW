import express from 'express'
import {sequelize} from './database/connect.js'
import usersRouter from './controllers/users.js' 
import reviewsRouter from './controllers/reviews.js'


const app = express()

app.use(express.json())


try {
    sequelize.authenticate()
    console.log('Db connected')
} catch (error) {
    console.error(error)
}



app.get('/', (req, res) => {
    res.json({message: 'todo ok'})
})


const PORT =   process.env.PORT || 3001
app.listen(PORT, () => { 
    console.log(`server on in port ${PORT}`)   //si no pones las comillas invertidas no reconoce a la variable PORT 
})

app.use(usersRouter)
app.use(reviewsRouter)
//quede en el video 3