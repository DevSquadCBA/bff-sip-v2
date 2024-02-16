import { Model, Column, Table, DataType, PrimaryKey, AutoIncrement, HasMany } from 'sequelize-typescript';
import { CreationOptional,QueryTypes} from 'sequelize';
import { Sale } from './Sale';

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
    deleted?: boolean,
}
@Table({
    tableName: 'clients'
})
export class Client extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id: CreationOptional<number>;

    @Column(DataType.STRING)
    declare name: string;

    @Column({ type: DataType.STRING, allowNull: true })
    declare fantasy_name: CreationOptional<string>;

    @Column(DataType.STRING)
    declare fiscalCategory: string;

    @Column(DataType.STRING)
    declare dni: string;

    @Column({ type: DataType.STRING, allowNull: true })
    declare email: CreationOptional<string>;

    @Column({ type: DataType.INTEGER, allowNull: true })
    declare phone: CreationOptional<number>;

    @Column({ type: DataType.INTEGER, allowNull: true })
    declare whatsapp: CreationOptional<number>;

    @Column({ type: DataType.STRING, allowNull: true })
    declare province: CreationOptional<string>;

    @Column({ type: DataType.STRING, allowNull: true })
    declare localidad: CreationOptional<string>;

    @Column({ type: DataType.STRING, allowNull: true })
    declare direction: CreationOptional<string>;

    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    declare deleted: CreationOptional<boolean>;

    @HasMany(() => Sale)
    declare sales: Sale[];

    static async getClientsWithSaleInfo(offset=0, limit=100) {
        if(!Client.sequelize){
            return []
        }
        const [results] = await Client.sequelize.query('CALL spGetAllClientsWithSalesInfo(:offset, :limit)', {
            replacements: { offset, limit },
            type: QueryTypes.SELECT
        })
        return results;
    }
}

