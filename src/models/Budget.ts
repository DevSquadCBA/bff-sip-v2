import { Model, Column, Table, DataType, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { CreationOptional, Op } from 'sequelize';
import { SaleStates } from './Enums';

export type IBudget = {
    id: number,
    clientId: number,
    state: SaleStates,
    creationDate: Date | string,
    updateDate: Date | string,
    deleted: boolean,
    total: number,
    budgetDetails: string,
    paid: string,
    dispatch: 'without' | 'with',
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
    declare state: SaleStates;

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
    declare dispatch: 'without' | 'with';

    @Column(DataType.STRING)
    declare seller: string;

    @Column(DataType.STRING)
    declare billing: string;


    static async getActiveBudgets(idClient:number){
        // reference query
        // (select COUNT(*) from ${process.env.BUDGET} b1 where b1.state !='finished' and b1.clientId = c.id and b1.deleted = 0) as 'active'
        return await Budget.findAll(
            {
                where:{
                    state: {
                        [Op.not]: ['finished','canceled']
                    },
                    deleted: false,
                    clientId: idClient
                }
            })
    }
    static async getTotalBudgets(idClient:number){
        //(select COUNT(*) from ${process.env.BUDGET} b2 where b2.clientId = c.id and b2.deleted = 0) as 'total',
        return await Budget.findAll(
            {
                where:{
                    deleted: false,
                    clientId: idClient
                }
            }
        )
    }
    static async getDateFromUpdatestBudget(idClient:number){
        // (select updateDate from ${process.env.BUDGET} b3 where b3.clientId = c.id and b3.deleted = 0 order by b3.updateDate DESC,b3.creationDate DESC limit 1) as 'lastModification'
        return await Budget.findAll(
            {
                where:{
                    clientId: idClient,
                    deleted: false
                },
                order:[
                    ['updateDate', 'DESC'],
                    ['creationDate', 'DESC']
                ],
                limit: 1
            }
        )
    }
}