import {Router} from 'express'
import { User } from '../models/User.js'
import { Review } from '../models/Review.js'
import { validateToken } from './authController.js';




const usersRouter = Router() 

usersRouter.get('/users', async(req,res) => {    //este es para traer todos los usuarios
    try {
        const users = await User.findAll()
        res.json(users) 
    } catch (error) {
        res.status(500).json({error: error.message}) 
    }
})


usersRouter.get('/users/:id', async(req,res) => {  //este es para traer un determinado usuario
    try {
        const {id} = req.params
        const user = await User.findByPk(id)
        res.json(user)       
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})






usersRouter.put('/users/:id', async(req,res) => {          //para editar un usuario
    try {
        const {id} = req.params
        const user = await User.findByPk(id)
        user.set(req.body) 
        await user.save()
        res.status(202).json(user) 
        
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})



usersRouter.delete('/users/:id', async(req,res) => {    //este para eliminar un usuario
    try {
        const {id} = req.params
        await User.destroy({
            where: {id}
        })
        res.status(204).end()
        
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})





usersRouter.get('/users/:id/reviews',validateToken, async(req,res) => {  //este es para traer todas las resenias de un usuario
    try {
        const {id} = req.params
        const user = await User.findOne({
            where:{id},
            include : {
                model: Review
            },
        })
        res.json(user)       
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

export default usersRouter

