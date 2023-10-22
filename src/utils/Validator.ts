import { BadRequestError } from "types/errors"
import { ApiGatewayParsedEvent } from "types/response-factory/proxies";

export enum Validators{
    OFFSET_AND_LIMITS = 'OffsetAndLimitValidator'
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

export function validate(validations: Validators[], event:ApiGatewayParsedEvent):ApiGatewayParsedEvent{
    if(validations.includes(Validators.OFFSET_AND_LIMITS)){
        event.queryStringParameters = offsetAndLimitValidator(event.queryStringParameters)
    }
    return event;
}