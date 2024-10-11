import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
//IMPORTAR LOS MODELOS
import User from "../models/User";
dotenv.config();

const createHashValue = async(value:string) =>{
  const salt = await bcrypt.genSalt();
  return await bcrypt.hashSync(value, salt)
}

const isValidPassword = async (psw: string, encrypted: string) =>{
  return await bcrypt.compareSync(psw, encrypted);
}

export const registerUser = async(req:Request, resp:Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    const hashedpsw = await createHashValue(password);
    const newUser = await User.create({
      username,
      password: hashedpsw
    });   
    resp.status(200).json({message:"create", newUser});
  } catch (error) {
    resp.status(500).json("ERROR")    
  }
}

export const loginUser = async (req: Request, resp: Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      resp.status(400).json("User y password son obligatorios");
    }
    const user = await User.findOne({ where: { username: username } });
    if (user === null || !user) {
      resp.status(400).json("Usuario no encontrado o incorrecto");
    }
    let comparePassword;
    if(user){
      comparePassword = await isValidPassword(password, user?.password)
    }
    if(!comparePassword){
      resp.status(400).json("Contraseña invalida");
    }

    // if (user.hacer bloqueo en el modelo >= 3) {
    //   user.bloqueado hacer en el modelo = true;
    //   await usuario.save();
    //   return res.status(401).json({ mensaje: 'Cuenta bloqueada por 3 intentos fallidos' });
    // }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET no está configurado");
    }
    const token = jwt.sign({name: username}, process.env.JWT_SECRET);
    resp.status(200).json({token});
  } catch (error) {
    resp.status(500).json("ERROR");
  }
}

export const getUsers = async(req:Request, resp:Response): Promise<void> => {
  try {  
    const users = await User.findAll()
    console.log(users) 
    resp.json(users);
  } catch (error) {
    resp.status(500).json("ERROR")
  }
}

export const putUsers = async(req:Request, resp:Response): Promise<void> => {
  try {  
    const id = req.params.id;
    const { username, password} = req.body;
    const findPK = await User.findByPk(id);
    if (!findPK) {
      resp.status(404).json({ mensaje: 'Registro no encontrado' });
    }
    const updateUser = await User.update({username, password}, {where:{id}})
    console.log("🚀 ~ putUsers ~ updateUser:", updateUser)
    // const findId = await User.findByPk(id)
    // findId?.username = username;  
    // await findId?.save()
    resp.json("actualizado");
  } catch (error) {
    console.log("🚀 ~ putUsers ~ error:", error)
    resp.status(500).json("ERROR")
  }
}

export const deleteUsers = async(req:Request, resp:Response): Promise<void> => {
  try {  
    const id = req.params.id;
    // const username = req.body.username;
    // console.log("🚀 ~ putUsers ~ username:", username)
    // const findDelete = await User.findOne(username);
    // console.log("🚀 ~ deleteUsers ~ findDelete:", findDelete)
    const user2 = await User.destroy({where: {id}});
    console.log("🚀 ~ putUsers ~ user2:", user2)
    resp.json('Eliminado');
  } catch (error) {
    console.log("🚀 ~ deleteUsers ~ error:", error)
    resp.status(500).json("ERROR");
  }
}
