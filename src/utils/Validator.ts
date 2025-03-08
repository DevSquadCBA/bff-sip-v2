import { BadRequestError, ForbiddenError, JSONInvalid,
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
    ID_USER = 'validateIdUser',
    VALID_JSON = 'validateJSONBody',
    QUERY ='validateQuery',
    VALID_USER = 'validateUser',
    ADMIN_PERMISSION = 'validateAdminPermissions',
    SUPERVISOR_PERMISSION = 'validateSupervisorPermissions',
    ANY_PERMISSION = 'validateAnyPermissions'
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
function validateIdUser(pathParameters:{id?:string}){
    if(!pathParameters.id){
        throw new BadRequestError('Es necesario enviar un id');
    }
    if(!/^[0-9]+$/.test(pathParameters.id)){
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

function validatePermissions(token:IToken, rol:String[]){
    console.log({token, rol})
    if(!rol.includes(token.role)){
        throw new ForbiddenError('No tienes permiso para realizar esta accion');
    }
}


export function validate(validations: Validators[], event:ApiGatewayParsedEvent):ApiGatewayParsedEvent{
    try{
        // every endpoint need a token
        // except for exceptions
        let token:IToken|null;
        if(!routesException.includes(event.path) && !routesException.includes(event.resource)){
            token = checkToken(event.headers);
        }else{
            console.log('La ruta es una excepción, no revisaré token');
            token = null;
        }

        if(validations.includes(Validators.OFFSET_AND_LIMITS)){
            event.queryStringParameters = {...offsetAndLimitValidator(event.queryStringParameters)}
        }
        if(validations.includes(Validators.ID_CLIENT)){
            event.pathParameters = validateIdClient(event.pathParameters);
        }
        if(validations.includes(Validators.ID_PROVIDER)){
            event.pathParameters = validateIdProvider(event.pathParameters);
        }
        if(validations.includes(Validators.ID_PRODUCT)){
            event.pathParameters = validateIdProduct(event.pathParameters);
        }
        if(validations.includes(Validators.ID_SALE)){
            event.pathParameters = validateIdSale(event.pathParameters);
        } 
        if(validations.includes(Validators.QUERY)){
            event.queryStringParameters = {...validateQuery(event.queryStringParameters)};
        }
        if (validations.includes(Validators.VALID_USER)){
            validate([Validators.VALID_JSON], event);
            event.body = {...validateUser(event.body as IUser)}
        } 
        if(validations.includes(Validators.ADMIN_PERMISSION)){
            console.log('Endpoint with admin permission');
            if(!token){throw new UnauthorizedError('No tienes un token par realizar esta acción');}
            validatePermissions(token, [Rol.ADMIN]);
        } 
        if(validations.includes(Validators.SUPERVISOR_PERMISSION)){
            if(!token){throw new UnauthorizedError('No tienes un token par realizar esta acción')}
            validatePermissions(token, [Rol.ADMIN,Rol.SUPERVISOR]);
        } 
        if(validations.includes(Validators.ANY_PERMISSION)){
            if(!token){throw new UnauthorizedError('No tienes un token par realizar esta acción')}
            validatePermissions(token, [Rol.USER,Rol.SELLER,Rol.ADMIN,Rol.SUPERVISOR]);
        } 
        if(validations.includes(Validators.ID_USER)){
            event.pathParameters = validateIdUser(event.pathParameters);
        }

        if(validations.includes(Validators.VALID_JSON)){
            try{
                event.body = JSON.parse(event.body as string);;
            }catch(e){
                throw new JSONInvalid();
            }
        }
        return event;
    }catch(e){
        console.error(e);
        throw e;
    }
    
}