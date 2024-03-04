import { Column, DataType,  ForeignKey, Model, Table } from "sequelize-typescript";
import { Sale } from "./Sale";
import { Product } from "./Product";
import { StateProduct, StateProductValues } from "./Enums";

export type ISaleProduct = {
    saleId: number,
    productId: number,
    quantity: number,
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
    
    @Column({type: DataType.ENUM(...StateProductValues),defaultValue: StateProduct.uninitiated})
    declare state: StateProduct;

    @Column({type: DataType.STRING, defaultValue: null})
    declare details?: string;

    // @Column
    // declare discountPercent: number;

    static async bulkUpdate(productToUpdate: Partial<ISaleProduct>[]){
        await this.sequelize?.query(`
            UPDATE sale_product ('productId','quantity') 
            VALUES ${productToUpdate.map(e=>`(${e.productId},${e.quantity})`)}
            where saleId = ${productToUpdate[0].saleId}
            On DUPLICATE KEY UPDATE quantity VALUES(quantity)
        `)
    }
}