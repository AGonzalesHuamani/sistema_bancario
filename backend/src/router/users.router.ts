import express, { Router } from "express";
import { registerUser, loginUser, getUsers, putUsers, deleteUsers } from "../controller/users.controller";

const routerUsers: Router = express.Router();

routerUsers.get('/', getUsers);
routerUsers.put('/:id', putUsers);
routerUsers.delete('/:id', deleteUsers);
routerUsers.get('/login', loginUser);
routerUsers.post('/create', registerUser);

export { routerUsers };