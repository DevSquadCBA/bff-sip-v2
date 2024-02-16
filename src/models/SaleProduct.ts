import { Column, DataType,  ForeignKey, Model, Table } from "sequelize-typescript";
import { Sale } from "./Sale";
import { Product } from "./Product";
import { StateProduct, StateProductValues } from "./Enums";

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

    // @Column
    // declare discountPercent: number;
}