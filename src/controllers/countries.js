import {Router} from 'express'
import { Country } from '../models/Country.js'
const countriesRouter = Router()

countriesRouter.get('/countries', async(req, res) => {   //devuelve todos los paises
    try {
        const countries = await Country.findAll() 
        res.json(countries)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: error.message})
    }
})


countriesRouter.post('/countries', async(req, res) => {                                       //crea un pais
    try {
        const {name} = req.body
        const newCountry = await Country.create({
            name
        })
        res.status(201).json(newCountry)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: error.message})
    }
})


export default countriesRouter 