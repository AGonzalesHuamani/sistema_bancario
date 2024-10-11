import express, { Router} from 'express'
import { getAllAccounts } from '../controller/account.controller';

const routerAccount = express.Router();

routerAccount.get('/', getAllAccounts);