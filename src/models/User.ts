import {  CreationOptional } from 'sequelize';
import {  Column, Table, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo ,Model} from 'sequelize-typescript';
import { IRol, Rol } from './Rol';

export type IUser = {
    name: string,
    email: string,
    phone?: string,
    password: string,
    whatsapp?: string,
    address?: string,
    role?: IRol
    roleId?: number
}



@Table({
    tableName: 'user',
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['email']
        }
    ]
})
export class User extends Model<User> {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER
    })
    declare id: CreationOptional<number>;

    @Column({
        type: DataType.STRING
    })
    declare name: string;

    @Column({
        type: DataType.STRING
    })
    declare email: string;

    @Column({
        type: DataType.STRING
    })
    declare phone: string;

    @Column({
        type: DataType.STRING
    })
    declare password: string;

    @Column({
        type: DataType.STRING
    })
    declare whatsapp: string;

    @Column({
        type: DataType.STRING
    })
    declare address: string;

    @ForeignKey(() => Rol)
    @Column({
        type: DataType.INTEGER
    })
    declare roleId: number;

    @BelongsTo(() => Rol)
    declare role: Rol;
}

