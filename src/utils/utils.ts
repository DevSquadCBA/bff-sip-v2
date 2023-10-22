import { APIGatewayProxyEventHeaders } from "aws-lambda";
import {entityMapping} from './config';
import { BadRequestError} from "types/errors";

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
    process.env.BUDGET= entityMapping[headers.entity];
}