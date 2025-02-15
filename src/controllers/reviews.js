import {Router} from 'express'
import { Review } from '../models/Review.js'
import { Country } from '../models/Country.js'
import { City } from '../models/City.js'
import { Op } from 'sequelize';


const reviewsRouter = Router()


reviewsRouter.get('/reviews', async(req, res) => {   //devuelve todas las resenias
    try {
        const reviews = await Review.findAll({
            include: [
              {
                model: City,
                include: [
                  {
                    model: Country
                  }
                ]
              }
            ]
          }) 
        res.json(reviews)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: error.message})
    }
})


reviewsRouter.get('/reviews/usuario/:userId', async(req, res) => {    //devuelve todas las reseñas que tienen un determinado userId
    try {
        const {userId} = req.params
        const reviews = await Review.findAll({
            include: [
                {
                  model: City,
                  include: [
                    {
                      model: Country
                    }
                  ]
                }
              ],
            where: {
                userId: userId
            }
        }) 
        res.json(reviews)

    } catch (error) {
        console.error(error)
        res.status(500).json({error: error.message})
    }
})



reviewsRouter.get('/reviews/:id', async(req, res) => {    //devuelve una resenia
    try {
        const {id} = req.params
        const review = await Review.findByPk(id) 
        if (review){        res.json(review) }
        else {res.status(500).json({message: 'Ocurrio un error'})}


    } catch (error) {
        console.error(error)
        res.status(500).json({error: error.message})
    }
})





reviewsRouter.get('/reviews/city/:cityName', async (req, res) => {
    try {
       const { cityName } = req.params;
       const reviews = await Review.findAll({
         include: [
           {
             model: City,
             where: {
               name: {
                 [Op.like]: `%${cityName}%`
               }
             },
             include: [
               {
                 model: Country
               }
             ]
           }
         ]
       });
       res.json(reviews);
    } catch (error) {
       console.error(error);
       res.status(500).json({ error: error.message });
    }
   });




reviewsRouter.post('/reviews', async(req, res) => {                                       //crea una resenia
    try {
        const {country, city,description,stars,userId} = req.body
        const existCountry = await Country.findOne({
            where: {name : country }
        })
        if (existCountry){
            const existCity = await City.findOne({
                where : { name : city}
            })
            let newCity 
            if (!existCity) {
                 newCity=await City.create({
                    name:city,
                    countryId: existCountry.id
                })
            } else {newCity = existCity}
         
        const newReview = await Review.create({
            description,
            stars,
            userId,
            cityId:newCity.id
        })
        res.status(201).json(newReview)
    }} catch (error) {
        console.error(error)
        res.status(500).json({error: error.message})
    }
})

 
reviewsRouter.put('/reviews/:id', async(req, res) => {   //actualizar una resenia
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


reviewsRouter.delete('/reviews/:id', async(req, res) => {   //eliminar una resenia
    try {
        const {id} = req.params
        Review.destroy({
            where: {id}
        })
        res.status(204).end()
    } catch (error) {
        console.error(error)
        res.status(500).json({error: error.message})
    }
})

export default reviewsRouter 