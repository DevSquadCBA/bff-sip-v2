import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Sale } from "./Sale";
import { Product } from "./Product";
import { StateProduct } from "./Enums";

@Table
export class SaleProduct extends Model {
    @ForeignKey(() => Sale)
    @Column
    declare saleId: number;

    @ForeignKey(() => Product)
    @Column
    declare productId: number;

    
    @Column
    declare quantity: number;
    
    @Column
    declare state: StateProduct;

    // @Column
    // declare discountPercent: number;
}