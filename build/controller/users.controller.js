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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// import jwt, { JwtPayload } from 'jsonwebtoken';
//IMPORTAR LOS MODELOS
const User_1 = __importDefault(require("../models/User"));
const createHashValue = (value) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcrypt_1.default.genSalt();
    return yield bcrypt_1.default.hashSync(value, salt);
});
const isValidPassword = (psw, encrypted) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.compareSync(psw, encrypted);
});
const registerUser = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const bcrypt = await import('bcrypt-ts');  // Importación dinámica
        // const saltRounds = 10;
        const { username, password } = req.body;
        const hashedpsw = yield createHashValue(password);
        const newUser = yield User_1.default.create({
            username,
            password: hashedpsw
        });
        resp.status(200).json({ message: "create", newUser });
    }
    catch (error) {
        resp.status(500).json("ERROR");
    }
});
exports.registerUser = registerUser;
// export const loginUser = async(req:Request, resp:Response): Promise<void> => {
//   try {  
//     const users = await User.findAll()
//     console.log(users) 
//     resp.json({message:"login", users });
//   } catch (error) {
//     resp.status(500).json("ERROR")
//   }
// }
const loginUser = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            resp.status(400).json("User y password son obligatorios");
        }
        const user = yield User_1.default.findOne({ where: { username: username } });
        if (user === null || !user) {
            resp.status(400).json("Usuario no encontrado o incorrecto");
        }
        let comparePassword;
        if (user) {
            comparePassword = yield isValidPassword(password, user === null || user === void 0 ? void 0 : user.password);
            console.log("🚀 ~ loginUser ~ comparePassword:", comparePassword);
        }
        if (!comparePassword) {
            resp.status(400).json("Contraseña invalida");
        }
        const token = jsonwebtoken_1.default.sign({ name: username }, "SECRET");
        console.log("🚀 ~ loginUser ~ token:", token);
        resp.status(200).json({ token });
    }
    catch (error) {
        resp.status(500).json("ERROR");
    }
});
exports.loginUser = loginUser;
