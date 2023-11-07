import {Router} from 'express'
import { City } from '../models/City.js'
const citiesRouter = Router()

citiesRouter.get('/cities', async(req, res) => {   //devuelve todas las ciudades
    try {
        const cities = await City.findAll() 
        res.json(cities)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: error.message})
    }
})

citiesRouter.get('/cities/:id', async(req,res) => {  //este es para traer una determinada ciudad
    try {
        const {id} = req.params
        const city = await City.findByPk(id)
        res.json(city)       
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})



citiesRouter.post('/cities', async(req, res) => {                                       //crea una ciudad
    try {
        const {name, countryId} = req.body
        const newCity = await City.create({
            name,
            countryId
        })
        res.status(201).json(newCity)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: error.message})
    }
})


citiesRouter.put('/cities/:id', async(req, res) => {   //actualizar una ciudad
    try {
        const {id} = req.params
        const city = await City.findByPk(id) 
        city.set(req.body) 
        await city.save()
        res.status(202).json(city)

    } catch (error) {
        console.error(error)
        res.status(500).json({error: error.message})
    }
})


export default citiesRouter 