import DbModel from "./DbModel";

export type IProduct = {
    id: number|null,
    code: number,
    name: string,
    salePrice: number,
    purchasePrice: string,
    provider: string,
    stockeable: number,
    negativeStock: number,
    productType: string,
    img: string,
    daysDelay: Date|number,
    deleted?: boolean,
}
export default class Product extends DbModel implements IProduct{
    code: number;
    name: string;
    salePrice: number;
    purchasePrice: string;
    provider: string;
    stockeable: number;
    negativeStock: number;
    productType: string;
    img: string;
    daysDelay: Date|number;
    deleted: boolean;
    constructor(input:IProduct){
        super('product');
        this.id = input.id;
        this.code= input.code;
        this.name= input.name;
        this.salePrice= input.salePrice;
        this.purchasePrice= input.purchasePrice;
        this.provider= input.provider;
        this.stockeable= input.stockeable;
        this.negativeStock= input.negativeStock;
        this.productType= input.productType;
        this.img= input.img;
        this.daysDelay= input.daysDelay;
        this.deleted= input.deleted || false;
    }
    static async getAll(offset:string, limit:string){
        const dbModel = new DbModel('product');
        return dbModel.getAll(offset,limit);
    }
    static async getById(idProduct:string){
        const dbModel = new DbModel('product');
        return dbModel.getById(idProduct);
    }
}