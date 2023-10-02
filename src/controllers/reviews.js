import {Router} from 'express'
import { Review } from '../models/Review.js'
const reviewsRouter = Router()

reviewsRouter.get('/reviews', async(req, res) => {   //devuelve todos los empleados
    try {
        const reviews = await Review.findAll() 
        res.json(reviews)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: error.message})
    }
})


reviewsRouter.get('/reviews/:id', async(req, res) => {    //devuelve un empleado
    try {
        const {id} = req.params
        const review = await Review.findByPk(id) 
        res.json(review)

    } catch (error) {
        console.error(error)
        res.status(500).json({error: error.message})
    }
})


reviewsRouter.post('/reviews', async(req, res) => {
    try {
        const {country,city,description,stars,userId} = req.body
        const newReview = await Review.create({
            country,
            city,
            description,
            stars,
            userId
        })
        res.status(201).json(newReview)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: error.message})
    }
})

 
reviewsRouter.put('/reviews/:id', async(req, res) => {   //actualizar un empleado
    try {
        const {id} = req.params
        const review = await Review.findByPk(id) 
        review.set(req.body) 
        await review.save()
        res.status(202).json(review)

    } catch (error) {
        console.error(error)
        res.status(500).json({error: error.message})
    }
})


reviewsRouter.delete('/reviews/:id', async(req, res) => {   //eliminar un empleado
    try {
        const {id} = req.params
        review.destroy({
            where: {id}
        })
        res.status(204).end()
    } catch (error) {
        console.error(error)
        res.status(500).json({error: error.message})
    }
})

export default reviewsRouter 