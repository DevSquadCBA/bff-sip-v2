import { Model, Column, Table, DataType, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { CreationOptional} from 'sequelize';
import { States } from './Enums';

export type IBudget = {
    id: number,
    clientId: number,
    state: States, // donde deberia crear el states?//
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

@Table({
    tableName: 'budgets'
})
export class Budget extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id: CreationOptional<number>;

    @Column(DataType.INTEGER)
    declare clientId: number;

    @Column(DataType.STRING)
    declare state: States;

    @Column(DataType.DATE)
    declare creationDate: Date;

    @Column(DataType.DATE)
    declare updateDate: Date;

    @Column(DataType.BOOLEAN)
    declare deleted: boolean;

    @Column(DataType.DECIMAL)
    declare total: number;

    @Column(DataType.STRING)
    declare budgetDetails: string;

    @Column(DataType.STRING)
    declare paid: string;
    
    @Column(DataType.STRING)
    declare dispatch: 'without'|'with';

    @Column(DataType.STRING)
    declare seller: string;

    @Column(DataType.STRING)
    declare billing: string;
}