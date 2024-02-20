import { Model, Column, Table, DataType, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { CreationOptional} from 'sequelize';

export type IProvider = {
    id?: number,
    name: string,
    fantasyName: string,
    cuit_cuil: number,
    email: string,
    province: string,
    locality: string,
    direction: string,
    phone: string,
    voucherType: string,
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
    declare email: string;

    @Column(DataType.STRING)
    declare province: string;

    @Column(DataType.STRING)
    declare locality: string;

    @Column(DataType.STRING)
    declare direction: string;

    @Column(DataType.STRING)
    declare phone: string;

    @Column(DataType.STRING)
    declare voucherType: string;

    @Column(DataType.INTEGER)
    declare daysDelays: number;

    @Column(DataType.BOOLEAN)
    declare deleted: CreationOptional<boolean>;
}  