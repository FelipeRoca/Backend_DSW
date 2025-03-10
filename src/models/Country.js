import { sequelize } from "../database/connect.js";
import{DataTypes} from 'sequelize' 
import { City } from "./City.js";

export const Country = sequelize.define('Country', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING        
    }
})


Country.hasMany(City,{
    foreignKey:'countryId',
    sourceKey: 'id'
 })

 City.belongsTo(Country, {
    foreignKey:'countryId',
    targetKey: 'id'
 })


 await Country.sync()
 await City.sync()
