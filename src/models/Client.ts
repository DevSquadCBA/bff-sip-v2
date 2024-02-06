import { CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import { Model,DataType } from 'sequelize-typescript';
import sequelize from 'services/sequelize';

export type IClient = {
    name: string,
    fantasy_name?: string,
    fiscalCategory: string,
    dni: string,
    email?: string,
    phone?: number,
    whatsapp?: number,
    province?: string,
    localidad?: string,
    direction?: string,
    creationDate: Date|number,
    deleted?: boolean,
}

export class Client extends Model<InferAttributes<Client>, InferCreationAttributes<Client>>{
    declare id: CreationOptional<number>;
    declare name: string;
    declare fantasy_name: CreationOptional<string>;
    declare fiscalCategory: string;
    declare dni: string;
    declare email: CreationOptional<string>;
    declare phone: CreationOptional<number>;
    declare whatsapp: CreationOptional<number>;
    declare province: CreationOptional<string>;
    declare localidad: CreationOptional<string>;
    declare direction: CreationOptional<string>;
    declare deleted: CreationOptional<boolean>;
}

Client.init(
    {
        id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataType.STRING},
        fantasy_name: {type: DataType.STRING , allowNull: true, defaultValue: null},
        fiscalCategory: { type: DataType.STRING},
        dni: { type: DataType.STRING },
        email: { type: DataType.STRING, allowNull: true, defaultValue: null},
        phone: { type: DataType.INTEGER, allowNull: true, defaultValue: null},
        whatsapp: { type: DataType.INTEGER, allowNull: true, defaultValue: null},
        province: { type: DataType.STRING, allowNull: true, defaultValue: null},
        localidad: { type: DataType.STRING, allowNull: true, defaultValue: null},
        direction: { type: DataType.STRING, allowNull: true, defaultValue: null},
        deleted: { type: DataType.BOOLEAN, defaultValue: false },
    },
    {
        tableName: 'clients',
        sequelize
    }    
)
