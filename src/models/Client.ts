import DbModel from "./DbModel";

type ClientConstructor = {
    id: number|null,
    name: string,
    fantasy_name: string,
    fiscalCategory: string,
    idNumber: string,
    email: string,
    phone: number,
    whatsapp: number,
    province: string,
    localidad: string,
    direction: string,
    creationDate: Date|number,
    deleted?: boolean,
}
export default class Client extends DbModel implements ClientConstructor{
    name: string;
    fantasy_name: string;
    fiscalCategory: string;
    idNumber: string;
    email: string;
    phone: number;
    whatsapp: number;
    province: string;
    localidad: string;
    direction: string;
    creationDate: Date|number;
    deleted: boolean;
    constructor(input:ClientConstructor){
        super('clients');
        this.id = input.id;
        this.name = input.name;
        this.fantasy_name = input.fantasy_name;
        this.fiscalCategory = input.fiscalCategory;
        this.idNumber = input.idNumber;
        this.email = input.email;
        this.phone = input.phone;
        this.whatsapp = input.whatsapp;
        this.province = input.province;
        this.localidad = input.localidad;
        this.direction = input.direction;
        this.creationDate = input.creationDate;
        this.deleted = input.deleted || false;
    }
    static async getAll(offset:string, limit:string){
        const dbModel = new DbModel('clients');
        return dbModel.getAll(offset,limit);
    }
}