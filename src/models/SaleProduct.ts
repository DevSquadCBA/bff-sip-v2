import { Column, DataType,  ForeignKey, Model, Table } from "sequelize-typescript";
import { Sale } from "./Sale";
import { Product } from "./Product";
import { StateProduct, StateProductValues } from "./Enums";
export type ISaleProduct = {
    saleId: number,
    productId: number,
    quantity: number,
    discount?: number,
    price:number,
    state: StateProduct
    details?: string|null
}


export type IProductToAdd = {
    id: number,
    quantity: number,
    details?: string|null
}


@Table({ tableName: 'sale_product' })
export class SaleProduct extends Model {
    @ForeignKey(() => Sale)
    @Column(DataType.INTEGER)
    declare saleId: number;

    @ForeignKey(() => Product)
    @Column(DataType.INTEGER)
    declare productId: number;
    
    @Column({type: DataType.INTEGER, defaultValue: 1})
    declare quantity: number;

    @Column({type: DataType.DECIMAL(10,2), defaultValue: 0})
    declare discount: number;

    @Column({type: DataType.DECIMAL(10,2), defaultValue: 0})
    declare price: number;
    
    @Column({type: DataType.ENUM(...StateProductValues),defaultValue: StateProduct.uninitiated})
    declare state: StateProduct;

    @Column({type: DataType.STRING, defaultValue: null})
    declare details?: string;

    // @Column
    // declare discountPercent: number;

    static async bulkUpdate(saleId: number, productToUpdate: Partial<ISaleProduct>[]){
        await this.sequelize?.query(`
            INSERT INTO sale_product (saleId,productId,quantity,discount,price,state,details,createdAt, updatedAt) 
            VALUES ${productToUpdate.map(e=>`(${saleId},${e.productId},${e.quantity},${e.discount},${e.price},"${e.state}","${e.details}", NOW(), NOW())`).join(', ')}
            On DUPLICATE KEY UPDATE 
                quantity = VALUES(quantity),
                details = VALUES(details),
                state = VALUES(state),
                updatedAt = NOW();
        `)
    }
}