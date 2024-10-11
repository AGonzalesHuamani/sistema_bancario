import { Request, Response } from "express";
import Account from "../models/Account";

export const getAllAccounts = async (req: Request, resp:Response): Promise<void> =>{
    try {
        const accountAll = await Account.findAll();
        console.log("🚀 ~ getAllAccounts ~ accountAll:", accountAll)
        resp.json("account");   
    } catch (error) {
        resp.status(500).json("Error al obtener las cuentas");
    }
}

export const createAccount = async (req: Request, resp: Response): Promise<void> => { 
    try {
        const { userId, balance } = req.body;
        const account = await Account.create({ userId, balance });
        resp.json(account);   
    } catch (error) {
        resp.status(500).json("Error al crear la cuenta");
    }  
};