import { CreationOptional } from "sequelize";
import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript"
import { User } from "./User";


export type IRol = {
    id: number,
    name: string
    description: string
}

@Table({
    tableName: 'role',
    timestamps: false
})
export class Rol extends Model {
    @PrimaryKey
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
    declare description: string

    belongsTo = () => {
        return Rol.hasMany(User, { foreignKey: 'roleId' })
    }

    static ADMIN = 'Administrador';
    static SUPERVISOR = 'Supervisor';
    static SELLER = 'Vendedor';
    static USER = 'Vendedor';
}