import { Column, Table, DataType, PrimaryKey, AutoIncrement, Model } from 'sequelize-typescript';
import { CreationOptional} from 'sequelize';
export type IProduct = {
    id?: number,
    code: number,
    name: string,
    salePrice: number,
    purchasePrice: number,
    providerId: number,
    stockeable: number,
    negativeStock: number,
    productType: string,
    img: string,
    daysDelay: number,
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
    declare purchasePrice: number;

    @Column(DataType.INTEGER)
    declare providerId: number;

    @Column(DataType.INTEGER)
    declare stockeable: number;

    @Column(DataType.INTEGER)
    declare negativeStock: number;

    @Column(DataType.STRING)
    declare productType: string;

    @Column(DataType.STRING)
    declare img: string;

    @Column(DataType.INTEGER)
    declare daysDelay: number;

    @Column(DataType.BOOLEAN)
    declare deleted: CreationOptional<boolean>;
}

