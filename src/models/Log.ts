import { Model, Column, Table, DataType, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { CreationOptional } from 'sequelize';
import { LogCategory } from './Enums';

export type IClient = {
    id: number;
    category: LogCategory;
    action: string;
    time: Date;
    userId: number;
    role: string;
    route: string;
    changes: string;
}
@Table({
    tableName: 'log'
})
export class Log extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id: CreationOptional<number>;

    @Column(DataType.STRING)
    declare action: string;

    @Column(DataType.ENUM(...Object.values(LogCategory)))
    declare category: LogCategory;

    @Column(DataType.DATE)
    declare time: Date;

    @Column(DataType.INTEGER)
    declare userId: number;

    @Column(DataType.STRING)
    declare role: string;

    @Column(DataType.STRING)
    declare route: string;

    @Column(DataType.TEXT('long'))
    declare changes: string;
}

