import { Model, Column, Table, DataType, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { CreationOptional} from 'sequelize';
export type IProduct = {
    id: number|null,
    code: number,
    name: string,
    salePrice: number,
    purchasePrice: string,
    provider: string,
    stockeable: number,
    negativeStock: number,
    productType: string,
    img: string,
    daysDelay: Date|number,
    deleted?: boolean,
}
@Table({
    tableName: 'products'
})
export class Product extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id: CreationOptional<number>;
    
    @Column(DataType.INTEGER)
    declare code: number;

    @Column(DataType.STRING)
    declare name: string;

    @Column(DataType.DECIMAL)
    declare salePrice: number;

    @Column(DataType.DECIMAL)
    declare purchasePrice: string;

    @Column(DataType.STRING)
    declare provider: string;

    @Column(DataType.INTEGER)
    declare stockeable: number;

    @Column(DataType.INTEGER)
    declare negativeStock: number;

    @Column(DataType.STRING)
    declare productType: string;

    @Column(DataType.STRING)
    declare img: string;

    @Column(DataType.DATE)
    declare daysDelay: Date|number;

    @Column(DataType.BOOLEAN)
    declare deleted: CreationOptional<boolean>;
}

