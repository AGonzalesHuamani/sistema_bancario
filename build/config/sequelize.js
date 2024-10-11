"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const { Sequelize } = require('sequelize');
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
if (!process.env.DATABASE || !process.env.DB_PASSWORD) {
    throw new Error('Las variables de entorno para la base de datos no están definidas');
}
// Configura la conexión a la base de datos
exports.sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false
});
