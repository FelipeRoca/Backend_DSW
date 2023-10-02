import {Router} from 'express'
import { User } from '../models/User.js'
import { Review } from '../models/Review.js'

const usersRouter = Router() 

usersRouter.get('/users', async(req,res) => {    //este es para traer todas las companias
    try {
        const users = await User.findAll()
        res.json(users) 
    } catch (error) {
        res.status(500).json({error: error.message}) 
    }
})


usersRouter.get('/users/:id', async(req,res) => {  //este es para traer una determinada compania
    try {
        const {id} = req.params
        const user = await User.findByPk(id)
        res.json(user)       
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})


usersRouter.post('/users', async(req,res) => {            //este es para crear una nueva compania
    try {
        const {email, password, name} = req.body
        const newUser = await User.create({
            email, 
            password, 
            name     
        })
        res.status(201).json(newUser)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})



usersRouter.put('/users/:id', async(req,res) => {          //para editar una compania
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



usersRouter.delete('/users/:id', async(req,res) => {    //este para eliminar una compania
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





usersRouter.get('/users/:id/reviews', async(req,res) => {  //este es para traer todos los empleados de una compania
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

