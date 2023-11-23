import DbModel from "./DbModel";

export type IBudget = {
    id: number|null,
    clientId: number,
    state: 'initiated'|'waiting_delivery'|'waiting_customer'|'in_transit'|'finished'|'canceled',
    creationDate: Date|string,
    updateDate: Date|string,
    deleted: boolean,
    total: number,
    budgetDetails: string,
    paid: string,
    dispatch: 'without'|'with',
    seller: string,
    billing: string,
}
export default class Budget extends DbModel implements IBudget{
    //no estoy segura de que este id vaya
    //id: number|null;
    clientId: number;
    state: 'initiated'|'waiting_delivery'|'waiting_customer'|'in_transit'|'finished'|'canceled';
    creationDate: Date|string;
    updateDate: Date|string;
    deleted: boolean;
    total: number;
    budgetDetails: string;
    paid: string;
    dispatch: 'without'|'with';
    seller: string;
    billing: string;
    constructor(input:IBudget){
        super('Budget');
        this.id = input.id;
        this.clientId = input.clientId;
        this.state = input.state;
        this.creationDate = input.creationDate;
        this.updateDate = input.updateDate;
        this.deleted   = input.deleted;
        this.total = input.total;
        this.budgetDetails = input.budgetDetails;
        this.paid = input.paid;
        this.dispatch = input.dispatch;
        this.seller = input.seller;
        this.billing = input.billing;
    }
    static async getAll(offset:string, limit:string){
        const dbModel = new DbModel('budget');
        return dbModel.getAll(offset,limit);
    }
    static async getById(idBudget:string){
        const dbModel = new DbModel('budget');
        return dbModel.getById(idBudget);
    }
//  me parecia que tenia que crear una funcion para crear nuevos    
// static async createNew(IBudget)
//         const dbModel = new DbModel('budget');
//         return DbModel.createNew(IBudget);
}

