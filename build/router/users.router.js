"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerUsers = void 0;
const express_1 = __importDefault(require("express"));
// import { getUser } from "../controller/users.controller";
const users_controller_1 = require("../controller/users.controller");
const routerUsers = express_1.default.Router();
exports.routerUsers = routerUsers;
routerUsers.get('/login', users_controller_1.loginUser);
routerUsers.post('/create', users_controller_1.registerUser);
