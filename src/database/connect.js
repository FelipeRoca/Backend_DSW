import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('prueba_proyecto', 'root','felipefelipe', {
    host: 'localhost',
    dialect: "mysql"
})