"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../config/sequelize");
const User_1 = __importDefault(require("./User"));
class Account extends sequelize_1.Model {
}
Account.init({
    id_account: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id_account',
    },
    id_user: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User_1.default,
            key: 'id_user',
        },
    },
    account_balance: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: false,
    },
}, {
    sequelize: sequelize_2.sequelize,
    modelName: "Account",
    tableName: "account",
    timestamps: false,
});
exports.default = Account;
