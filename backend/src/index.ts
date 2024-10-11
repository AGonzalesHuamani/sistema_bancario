import express, { Application, Request, Response } from "express";
import { router } from "./router/index.router";
import dotenv from "dotenv";
import {testConnection} from './testConnection'
import { sequelize } from "./config/sequelize";
import { User, Account, Transaction } from './models/index.models';
import './models/association';

dotenv.config();

const app: Application = express();
app.use(express.json());
const port: number = parseInt(process.env.PORT ||"8000", 10);//10 es la base numérica

app.get("/", (req: Request, res: Response): void => {
  res.send('Sistema bancario');
});

router(app);

const startServer = async () => {
    try {
      await testConnection();
      console.log('Database connected');

      await sequelize.sync();
      console.log('Database synchronized successfully!');

      app.listen(port, () => {
        console.log(`Server running on port ${port}`);
      });
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
};
  
startServer();

