"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testConnection = void 0;
const sequelize_1 = require("./config/sequelize");
const testConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelize_1.sequelize.authenticate();
        console.log('Conexión a la base de datos establecida correctamente.');
        console.log('Base de datos:', sequelize_1.sequelize.getDatabaseName());
    }
    catch (error) {
        console.error('No se pudo conectar a la base de datos:', error);
    }
});
exports.testConnection = testConnection;
(0, exports.testConnection)();
