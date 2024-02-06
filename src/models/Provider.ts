import { InferAttributes, InferCreationAttributes} from'sequelize';
import { Model, DataType } from 'sequelize-typescript';
import sequelize from 'services/sequelize';

export type IProvider = {
    id: number|null,
    name: string,
    fantasy_name: string,
    cuit_cuil: number,
    email: string,
    province: string,
    locality: string,
    direction: string,
    phone: number,
    voucherType: string,
    daysDelays: Date|number,
    deleted?: boolean,
}
export class Provider extends Model<InferAttributes<Provider>, InferCreationAttributes<Provider>>{
    declare id: number|null;
    declare name: string;
    declare fantasy_name: string;
    declare cuit_cuil: number;
    declare email: string;
    declare province: string;
    declare locality: string;
    declare direction: string;
    declare phone: number;
    declare voucherType: string;
    declare daysDelays: Date|number;
    declare deleted: boolean;
}
Provider.init(
    {
        id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true, allowNull: true },
        name: { type: DataType.STRING, allowNull: false },
        fantasy_name: { type: DataType.STRING, allowNull: false },
        cuit_cuil: { type: DataType.INTEGER, allowNull: false },
        email: { type: DataType.STRING, allowNull: false },
        province: { type: DataType.STRING, allowNull: false },
        locality: { type: DataType.STRING, allowNull: false },
        direction: { type: DataType.STRING, allowNull: false },
        phone: { type: DataType.INTEGER, allowNull: false },
        voucherType: { type: DataType.STRING, allowNull: false },
        daysDelays: { type: DataType.DATE, allowNull: false },
        deleted: { type: DataType.BOOLEAN, defaultValue: false },
    },
    {
        tableName: 'providers',
        sequelize,
    }
)
    