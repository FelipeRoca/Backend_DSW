import { sequelize } from "../database/connect.js";
import{DataTypes} from 'sequelize' 
import { Review } from "./Review.js";

export const City = sequelize.define('City', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING        
    }
})



City.hasMany(Review,{
    foreignKey:'cityId',
    sourceKey: 'id'
 })

 Review.belongsTo(City, {
    foreignKey:'cityId',
    targetKey: 'id'
 })