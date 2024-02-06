import { InferAttributes, InferCreationAttributes} from'sequelize';
import { Model, DataType } from 'sequelize-typescript';
import sequelize from 'services/sequelize';
import { States, StatesValues } from './Enums';

export type IBudget = {
    id: number,
    clientId: number,
    state: States,
    creationDate: Date|string,
    updateDate: Date|string,
    deleted: boolean,
    total: number,
    budgetDetails: string,
    paid: string,
    dispatch: 'without'|'with',
    seller: string,
    billing: string,
}

export class Budget extends Model<InferAttributes<Budget>, InferCreationAttributes<Budget>>{
    declare id: number;
    declare clientId: number;
    declare state: States;
    declare creationDate: Date|string;
    declare updateDate: Date|string;
    declare deleted: boolean;
    declare total: number;
    declare budgetDetails: string;
    declare paid: string;
    declare dispatch: 'without'|'with';
    declare seller: string;
    declare billing: string;
}

Budget.init(
    {
        id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true, allowNull: true },
        clientId: { type: DataType.INTEGER, allowNull: false },
        state: { type: DataType.ENUM(...StatesValues), allowNull: false },
        creationDate: { type: DataType.DATE, allowNull: false },
        updateDate: { type: DataType.DATE, allowNull: false },
        deleted: { type: DataType.BOOLEAN, defaultValue: false },
        total: { type: DataType.FLOAT, allowNull: false },
        budgetDetails: { type: DataType.TEXT },
        paid: { type: DataType.STRING },
        dispatch: { type: DataType.ENUM('without', 'with'), allowNull: false },
        seller: { type: DataType.STRING },
        billing: { type: DataType.STRING },
    },
    {
        tableName: 'budgets',
        sequelize,
    }
);