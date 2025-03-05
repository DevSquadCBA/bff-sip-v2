import { BadRequestError, JSONInvalid,
     UnauthorizedError 
    } from "types/errors"
import { ApiGatewayParsedEvent } from "types/response-factory/proxies";
import jwt from "jsonwebtoken";
import { IToken } from "models/Token";
import { Rol } from "models/Rol";
import { IUser } from "models/User";

const routesException = [
    '/health',
    '/auth/login',
    '/admin/syncDb',
    '/admin/fakeData',
    '/api/health',
    '/api/auth/login',
    '/api/admin/syncDb',
    '/api/admin/fakeData'
];

export enum Validators{
    OFFSET_AND_LIMITS = 'OffsetAndLimitValidator',
    ID_CLIENT = 'validateIdClient',
    ID_PROVIDER = 'validateIdProvider',
    ID_PRODUCT = 'validateIdProduct',
    ID_SALE = 'validateIdSale',
    VALID_JSON = 'validateJSONBody',
    QUERY ='validateQuery',
    VALID_USER = 'validateUser',
    ADMIN_PERMISSION = 'validatePermissions',
    SUPERVISOR_PERMISSION = 'validatePermissions',
    ANY_PERMISSION = 'validatePermissions'
}

function checkToken(headers:{authorization?:string}):IToken{
    if(!headers.authorization){
        throw new UnauthorizedError("Usuario no logueado");
    }
    try {
        const token = headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT as string);
        return decoded as IToken;
    } catch (err) {
        throw new UnauthorizedError("Token inválido o expirado");
    }
}

function offsetAndLimitValidator(queryStringParameters:{offset?:string, limit?: string}){
    let queryStringToReturn = {offset:'0',limit:'100000'}
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

function validateIdSale(pathParameters:{idSale?:string}){
    if(!pathParameters.idSale){
        throw new BadRequestError('Es necesario enviar un idSale');
    }
    if(!/^[0-9]+$/.test(pathParameters.idSale)){
        throw new BadRequestError('El idSale debe ser un número');
    }
    return pathParameters;
}

function validateQuery(queryStringParameters:{query?:string}){
    if(!queryStringParameters.query){
        throw new BadRequestError('Es necesario enviar un query');
    }
    return queryStringParameters;
}

function validateUser(body:IUser){
    if(!body){
        throw new BadRequestError('Es necesario enviar un user');
    }
    if (!body.name || !body.email || !body.password || !body.roleId) {
        throw new BadRequestError('El user debe tener las propiedades obligatorias: name, email, password, role');
    }
    return body;
}

function validatePermissions(token:IToken, rol:String){
    if(token.role !== rol){
        throw new UnauthorizedError('No tienes permiso para realizar esta accion');
    }
}


export function validate(validations: Validators[], event:ApiGatewayParsedEvent):ApiGatewayParsedEvent{
    // every endpoint need a token
    // except for exceptions
    let token:IToken|null;
    if(!routesException.includes(event.path) && !routesException.includes(event.resource)){
        token = checkToken(event.headers);
    }else{
        token = null;
    }

    if(validations.includes(Validators.OFFSET_AND_LIMITS)){
        event.queryStringParameters = {...offsetAndLimitValidator(event.queryStringParameters)}
    }else if(validations.includes(Validators.ID_CLIENT)){
        event.pathParameters = validateIdClient(event.pathParameters);
    }else if(validations.includes(Validators.ID_PROVIDER)){
        event.pathParameters = validateIdProvider(event.pathParameters);
    }else if(validations.includes(Validators.ID_PRODUCT)){
        event.pathParameters = validateIdProduct(event.pathParameters);
    }else if(validations.includes(Validators.ID_SALE)){
        event.pathParameters = validateIdSale(event.pathParameters);
    } else if(validations.includes(Validators.QUERY)){
        event.queryStringParameters = {...validateQuery(event.queryStringParameters)};
    }else if (validations.includes(Validators.VALID_USER)){
        validate([Validators.VALID_JSON], event);
        event.body = {...validateUser(event.body as IUser)}
    }
     else if(validations.includes(Validators.ADMIN_PERMISSION)){
        if(!token){return event;}
        validatePermissions(token, Rol.ADMIN);
    } else if(validations.includes(Validators.SUPERVISOR_PERMISSION)){
        if(!token){return event;}
        validatePermissions(token, Rol.SUPERVISOR);
    } else if(validations.includes(Validators.ANY_PERMISSION)){
        if(!token){return event;}
        validatePermissions(token, Rol.USER);
    } 

    if(validations.includes(Validators.VALID_JSON)){
        try{
            event.body = JSON.parse(event.body as string);;
        }catch(e){
            throw new JSONInvalid();
        }
    }
    return event;
}