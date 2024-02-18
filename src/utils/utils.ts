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

export class Log{
    static log(message:string){
        console.log(message);
    }
    static info(message: string|{message:string}){
        if(message instanceof Object){
            console.log(`\x1b[36m${message.message}\x1b[0m`);
        }else{
            console.log(`\x1b[36m${message}\x1b[0m`);
        }
    }
}