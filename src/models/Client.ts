import { Model, Column, Table, DataType, PrimaryKey, AutoIncrement, HasMany } from 'sequelize-typescript';
import { CreationOptional,QueryTypes} from 'sequelize';
import { Sale } from './Sale';

export type IClient = {
    name: string,
    fantasyName?: string,
    fiscalCategory: string,
    dni: string,
    email?: string,
    phone?: string,
    whatsapp?: string,
    province?: string,
    localidad?: string,
    address?: string,
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
    declare fantasyName: CreationOptional<string>;

    @Column(DataType.ENUM('Consumidor Final', 'Monotributista', 'Responsable Inscripto', 'Exento', 'No categorizado'))
    declare fiscalCategory: 'Consumidor Final' | 'Monotributista' | 'Responsable Inscripto' | 'Exento' | 'No categorizado';

    @Column(DataType.STRING)
    declare dni: string;

    @Column({ type: DataType.STRING, allowNull: true })
    declare email: CreationOptional<string>;

    @Column({ type: DataType.STRING, allowNull: true })
    declare phone: CreationOptional<string>;

    @Column({ type: DataType.STRING, allowNull: true })
    declare whatsapp: CreationOptional<string>;

    @Column({ type: DataType.STRING, allowNull: true })
    declare province: CreationOptional<string>;

    @Column({ type: DataType.STRING, allowNull: true })
    declare localidad: CreationOptional<string>;

    @Column({ type: DataType.STRING, allowNull: true })
    declare address: CreationOptional<string>;

    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    declare deleted: CreationOptional<boolean>;

    @HasMany(() => Sale)
    declare sales: Sale[];

    static async getClientsWithSaleInfo(offset=0, limit=100) {
        if(!Client.sequelize){
            return []
        }
        let [results] = await Client.sequelize.query('CALL spGetAllClientsWithSalesInfo(:offset, :limit)', {
            replacements: { offset, limit },
            type: QueryTypes.SELECT
        })
        return Object.keys(results).map((key:string) => results[key as keyof typeof results])
        
    }
}

