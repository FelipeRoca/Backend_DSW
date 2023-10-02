import { sequelize } from "../database/connect.js";
import{DataTypes} from 'sequelize' 


export const Review = sequelize.define('Review', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    country:{
        type:DataTypes.STRING        
    },
    city:{
        type:DataTypes.STRING        
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