import { APIGatewayProxyEventHeaders } from "aws-lambda";
import {entityMapping} from './config';
import { BadRequestError} from "types/errors";
import { ApiGatewayParsedEvent } from "types/response-factory/proxies";
import { Log } from "models/Log";
import { LogCategory } from "models/Enums";
import jwt from 'jsonwebtoken';
import { IToken } from "models/Token";
import { SaleComplete } from "models/Sale";

export function getEntity(headers:APIGatewayProxyEventHeaders & {entity?:string, Entity?:string}){
    if(headers.Entity){
        headers.entity = headers.Entity;
    }
    if(!headers.entity){
        throw new BadRequestError('No has definido una entidad');
    }
    if(!(headers.entity in entityMapping)){
        throw new BadRequestError('La entidad definida no es válida')
    }
    process.env.SALE= entityMapping[headers.entity];
}


function getCategory(path:string){
    if(path.includes('addPayment')){
        return LogCategory.PAYMENT
    }else if(path.startsWith('/sale')){
        return LogCategory.SALE
    }else if(path.startsWith('/product')){
        return LogCategory.PRODUCT
    }else if(path.startsWith('/client')){
        return LogCategory.CLIENT
    }else if(path.startsWith('/provider')){
        return LogCategory.PROVIDER
    }else if(path.startsWith('/user')){
        return LogCategory.USER
    }
}
function getAction(method:'POST'|'PUT'|'DELETE'){
    const methods = {
        POST: 'create',
        PUT: 'update',
        DELETE: 'delete'
    }
    return methods[method];
}

export function saveLog(event:ApiGatewayParsedEvent):void{
    if(event.httpMethod == 'GET'){return;}
    const category = getCategory(event.path);
    const token = event.headers.authorization?.replace('Bearer ', '');
    if(!token) return;
    const userData:IToken = jwt.decode(token) as IToken;
    console.log(userData);
    Log.create({
        category,
        action: getAction(event.httpMethod as 'POST'|'PUT'|'DELETE')|| 'update',
        time: new Date(),
        userId: userData.id,
        role: userData.role,
        route: event.path,
        changes: JSON.stringify(event.body)
    })
}

export function recalculateTotal(hasDiscount:boolean,sale:SaleComplete){
    return hasDiscount
    ? sale.products.reduce((acc: number, product: any) => {
            const totalProduct = (parseFloat(product.saleProduct.price) * parseFloat(product.quantity)) * parseFloat(product.discount);
            return acc + Math.round(totalProduct)
        }, 0)
    : sale.products.reduce((acc, product) => acc + product.saleProduct.price * (product.saleProduct.quantity), 0);
}