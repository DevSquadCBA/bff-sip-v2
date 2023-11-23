import { BadRequestError } from "types/errors"
import { ApiGatewayParsedEvent } from "types/response-factory/proxies";

export enum Validators{
    OFFSET_AND_LIMITS = 'OffsetAndLimitValidator',
    ID_CLIENT = 'validateIdClient',
    ID_PROVIDER = 'validateIdProvider',
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

function validateIdProvider(pathParameters:{idProvider?:string}){
    if(!pathParameters.idProvider){
        throw new BadRequestError('Es necesario enviar un idProvider');
    }
    if(!/^[0-9]+$/.test(pathParameters.idProvider)){
        throw new BadRequestError('El idProvider debe ser un número');
    }
    return pathParameters;
}
function validateIdProduct(pathParameters:{idProduct?:string}){
    if(!pathParameters.idProduct){
        throw new BadRequestError('Es necesario enviar un idProduct');
    }
    if(!/^[0-9]+$/.test(pathParameters.idProduct)){
        throw new BadRequestError('El idProduct debe ser un número');
    }
    return pathParameters;
}

export function validate(validations: Validators[], event:ApiGatewayParsedEvent):ApiGatewayParsedEvent{
    if(validations.includes(Validators.OFFSET_AND_LIMITS)){
        event.queryStringParameters = offsetAndLimitValidator(event.queryStringParameters)
    }else if(validations.includes(Validators.ID_CLIENT)){
        event.pathParameters = validateIdClient(event.pathParameters);
    }else if(validations.includes(Validators.ID_PROVIDER)){
        event.pathParameters = validateIdProvider(event.pathParameters);
    }else if(validations.includes(Validators.ID_PRODUCT)){
        event.pathParameters = validateIdProduct(event.pathParameters);
    }
    return event;
}