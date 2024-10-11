const { Sequelize } = require('sequelize');
import dotenv from 'dotenv';
dotenv.config();

if (!process.env.DATABASE || !process.env.DB_PASSWORD ) {
    throw new Error('Las variables de entorno para la base de datos no están definidas');
}
// Configura la conexión a la base de datos
export const sequelize = new Sequelize(process.env.DATABASE,process.env.USER ,process.env.DB_PASSWORD, {
    host: 'localhost', 
    dialect: 'postgres', 
    logging: false
});
