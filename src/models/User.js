import {DataTypes} from 'sequelize' ;
import {sequelize } from "../database/connect.js";
import { Review } from "./Review.js"


export const User = sequelize.define('User', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique: true
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    name:{
        type:DataTypes.STRING,
        unique: true
    }
})

 User.hasMany(Review,{
    foreignKey:'userId',
    sourceKey: 'id'
 })

 Review.belongsTo(User, {
    foreignKey:'userId',
    targetKey: 'id'
 })

 await User.sync()
 await Review.sync()