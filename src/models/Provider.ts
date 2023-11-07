import DbModel from "./DbModel";

export type IProvider = {
    id: number|null,
    name: string,
    fantasy_name: string,
    cuit_cuil: number,
    email: string,
    province: string,
    locality: string,
    direction: string,
    phone: number,
    voucherType: string,
    daysDelays: Date|number,
    deleted?: boolean,
}
export default class Provider extends DbModel implements IProvider{
    name: string;
    fantasy_name: string;
    cuit_cuil: number;
    email: string;
    province: string;
    locality: string;
    direction: string;
    phone: number;
    voucherType: string;
    daysDelays: Date|number;
    deleted: boolean;
    constructor(input:IProvider){
        super('providers');
        this.id = input.id;
        this.name= input.name;
        this.fantasy_name= input.fantasy_name;
        this.cuit_cuil= input.cuit_cuil;
        this.email= input.email;
        this.province= input.province;
        this.locality= input.locality;
        this.direction= input.direction;
        this.phone= input.phone;
        this.voucherType= input.voucherType;
        this.daysDelays= input.daysDelays;
        this.deleted= input.deleted || false;
    }
    static async getAll(offset:string, limit:string){
        const dbModel = new DbModel('providers');
        return dbModel.getAll(offset,limit);
    }
    static async getById(idProvider:string){
        const dbModel = new DbModel('providers');
        return dbModel.getById(idProvider);
    }
}