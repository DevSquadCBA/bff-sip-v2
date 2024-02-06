import { InferAttributes, InferCreationAttributes} from'sequelize';
import { Model, DataType } from 'sequelize-typescript';
import sequelize from 'services/sequelize';

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
export class Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product>>{ 
    declare id: number|null;
    declare code: number;
    declare name: string;
    declare salePrice: number;
    declare purchasePrice: string;
    declare provider: string;
    declare stockeable: number;
    declare negativeStock: number;
    declare productType: string;
    declare img: string;
    declare daysDelay: Date|number;
    declare deleted: boolean;
}   

Product.init(

    {
        id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true, allowNull: true },
        code: { type: DataType.INTEGER, allowNull: false },
        name: { type: DataType.STRING, allowNull: false },
        salePrice: { type: DataType.FLOAT, allowNull: false },
        purchasePrice: { type: DataType.STRING, allowNull: false },
        provider: { type: DataType.STRING, allowNull: false },
        stockeable: { type: DataType.INTEGER, allowNull: false },
        negativeStock: { type: DataType.INTEGER, allowNull: false },
        productType: { type: DataType.STRING, allowNull: false },
        img: { type: DataType.STRING, allowNull: false },
        daysDelay: { type: DataType.DATE, allowNull: false },
        deleted: { type: DataType.BOOLEAN, defaultValue: false },
    },
    {
        tableName: 'products',
        sequelize,
    }
)