import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Rol } from "./Rol";
import { User } from "./User";

@Table
export class UserRole extends Model {
    @ForeignKey(() => Rol)
    @Column
    declare roleId: number;

    @ForeignKey(() => User)
    @Column
    declare userId: number;
    
}