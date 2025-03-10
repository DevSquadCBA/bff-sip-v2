import {  Column, Table, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo ,Model} from 'sequelize-typescript';
import { CreationOptional, Op } from 'sequelize';
import { EntityList, EntityListValues, SaleStates, SalesStatesValues, StateProduct} from './Enums';
import { Client, IClient } from './Client';
import { ISaleProduct, SaleProduct } from './SaleProduct';
import { IProduct } from './Product';
import { Provider } from './Provider';

export type ISale = {
    id?: number,
    clientId: number,
    state: SaleStates,
    deleted?: boolean,
    total: number,
    paid: number,
    budgetDetails: string,
    dispatch: 'without' | 'with',
    seller: string,
    billing: string,
    estimatedDays: number,
    deadline: Date|null,
    entity: EntityList
}
export type ProductsInSale = {
    id:number,
    productId?:number,
    code: string,
    name: string,
    salePrice: number,
    purchasePrice: number,
    saleProduct?: { 
        quantity: number,
        state: StateProduct, 
        details?: string
        price?: number,
        discount?: number
    },
    quantity?: number,
    state?: StateProduct,
    details?: string,
    entity: EntityList,
}
export type SaleWithProduct = ISale & {products: ProductsInSale[]}
export type SaleWithProductAndProductsSale = ISale & {products: (ProductsInSale & {saleProduct: ISaleProduct})[]}
export type SaleComplete = ISale & {
    createdAt: string,
    distinctProviders: number,
    daysToDueDate: number,
    total: number
    client: IClient,
    products: (IProduct & {
        provider: Provider
        saleProduct: SaleProduct
    })[],
    get: ({plain}:{plain: boolean}) => any
}
@Table({
    tableName: 'sales'
})
export class Sale extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id: CreationOptional<number>;

    @ForeignKey(() => Client)
    @Column(DataType.INTEGER)
    declare clientId: number;

    @BelongsTo(() => Client)
    declare client: Client;

    @Column({type:DataType.ENUM(...SalesStatesValues), defaultValue: SaleStates.presupuesto})
    declare state: SaleStates;

    @Column(DataType.DECIMAL)
    declare total: number;

    @Column(DataType.STRING)
    declare budgetDetails: string;

    @Column({type:DataType.DECIMAL, defaultValue: 0})
    declare paid: number;

    @Column(DataType.STRING)
    declare dispatch: 'without' | 'with';

    @Column(DataType.STRING)
    declare seller: string;

    @Column(DataType.STRING)
    declare billing: string;

    @Column({type: DataType.INTEGER, defaultValue: 60})
    declare estimatedDays: number;

    @Column({type: DataType.BOOLEAN,defaultValue: false})
    declare deleted: CreationOptional<boolean>;

    @Column(DataType.ENUM(...EntityListValues))
    declare entity: EntityList;

    @Column({type:DataType.DATE, defaultValue: null})
    declare deadline: CreationOptional<Date|null>;
    
    static async getActiveSales(idClient:number){
        // reference query
        // (select COUNT(*) from ${process.env.SALE} b1 where b1.state !='finished' and b1.clientId = c.id and b1.deleted = 0) as 'active'
        return await Sale.findAll(
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
    static async getTotalSales(idClient:number){
        //(select COUNT(*) from ${process.env.SALE} b2 where b2.clientId = c.id and b2.deleted = 0) as 'total',
        return await Sale.findAll(
            {
                where:{
                    deleted: false,
                    clientId: idClient
                }
            }
        )
    }
    static async getDateFromUpdatestSale(idClient:number){
        // (select updateDate from ${process.env.SALE} b3 where b3.clientId = c.id and b3.deleted = 0 order by b3.updateDate DESC,b3.creationDate DESC limit 1) as 'lastModification'
        return await Sale.findAll(
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
