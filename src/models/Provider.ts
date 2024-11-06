import { Model, Column, Table, DataType, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { CreationOptional} from 'sequelize';

export type IProvider = {
    id?: number,
    name: string,
    fantasyName: string,
    cuit_cuil: number,
    email?: string,
    province?: string,
    locality?: string,
    address?: string,
    phone?: string,
    voucherType?: string,
    daysDelays: number,
    deleted?: boolean,
}
@Table({
    tableName:'providers'
})
export class Provider extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id: CreationOptional<number>;

    @Column(DataType.STRING)
    declare name: string;

    @Column(DataType.STRING)
    declare fantasyName: string;

    @Column(DataType.INTEGER)
    declare cuit_cuil: number;

    @Column(DataType.STRING)
    declare email: CreationOptional<string>;

    @Column(DataType.STRING)
    declare province: CreationOptional<string>;

    @Column(DataType.STRING)
    declare locality: CreationOptional<string>;

    @Column(DataType.STRING)
    declare address: CreationOptional<string>;

    @Column(DataType.STRING)
    declare phone: CreationOptional<string>;

    @Column(DataType.STRING)
    declare voucherType: CreationOptional<string>;

    @Column(DataType.INTEGER)
    declare daysDelays: number;

    @Column({type: DataType.BOOLEAN,defaultValue: false})
    declare deleted: CreationOptional<boolean>;
}  