import { sequelize } from "../database/connect.js";
import{DataTypes} from 'sequelize' 


export const Review = sequelize.define('Review', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    imag:{
        type:DataTypes.BLOB      
    },
    description:{
        type:DataTypes.STRING      
    },
    stars:{
        type:DataTypes.INTEGER
    }
})

