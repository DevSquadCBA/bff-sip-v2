import { BadRequestError } from "types/errors"
import { ApiGatewayParsedEvent } from "types/response-factory/proxies";

export enum Validators{
    OFFSET_AND_LIMITS = 'OffsetAndLimitValidator',
    ID_CLIENT = 'validateIdClient',
    ID_PRODUCT = 'validateIdProduct'
}

function offsetAndLimitValidator(queryStringParameters:{offset?:string, limit?: string}){
    let queryStringToReturn = {offset:'0',limit:'30'}
    if(queryStringParameters?.offset){
        if(!/^[0-9]+$/.test(queryStringParameters.offset.toString())){
            throw new BadRequestError('El offset, debe ser un número')
        }
        queryStringToReturn.offset = queryStringParameters.offset
    }
    if(queryStringParameters?.limit){
        if(!/^[0-9]+$/.test(queryStringParameters.limit.toString())){
            throw new BadRequestError('El límite, debe ser un número')
        }
        queryStringToReturn.limit = queryStringParameters.limit
    }
    return queryStringToReturn;
}

function validateIdClient(pathParameters:{idClient?:string}){
    if(!pathParameters.idClient){
        throw new BadRequestError('Es necesario enviar un idClient');
    }
    if(!/^[0-9]+$/.test(pathParameters.idClient)){
        throw new BadRequestError('El idClient debe ser un número');
    }
    return pathParameters;
}

export function validate(validations: Validators[], event:ApiGatewayParsedEvent):ApiGatewayParsedEvent{
    if(validations.includes(Validators.OFFSET_AND_LIMITS)){
        event.queryStringParameters = offsetAndLimitValidator(event.queryStringParameters)
    }else if(validations.includes(Validators.ID_CLIENT)){
        event.pathParameters = validateIdClient(event.pathParameters);
    }
    return event;
}