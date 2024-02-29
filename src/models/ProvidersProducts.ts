import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Provider } from "./Provider";
import { Product } from "./Product";

@Table
export class ProviderProduct extends Model {
    @ForeignKey(() => Provider)
    @Column
    declare providerId: number;

    @ForeignKey(() => Product)
    @Column
    declare productId: number;

    
    @Column
    declare productType: string;
    
}