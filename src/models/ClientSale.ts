import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Sale } from "./Sale";
import { Client } from "./Client";
import { SaleStates } from "./Enums";

@Table
export class ClientSale extends Model {
    @ForeignKey(() => Client)
    @Column
    declare clientId: number;

    @ForeignKey(() => Sale)
    @Column
    declare saleId: number;

    @Column 
    declare saleState: SaleStates;
}