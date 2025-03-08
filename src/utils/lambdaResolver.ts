import { HTTPError } from "types/errors";
import { ApiGatewayParsedEvent } from "types/response-factory/proxies";
import { getEntity, saveLog } from "./utils";
import { Validators, validate } from "./Validator";
import sequelize from "services/sequelize";

type lambdaResponse = {
    statusCode: number,
    headers: {
        "Access-Control-Allow-Origin": string,
        "Content-Type": string
    }, 
    body: unknown
    isBase64Encoded: boolean
}

function responseFactory({body, statusCode}: {body:unknown, statusCode: number}){
    return {
        statusCode, 
        headers:{
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body), 
        isBase64Encoded: false
    }
}


export async function LambdaResolver(event:ApiGatewayParsedEvent, domain:any, validators?:Validators[]):Promise<lambdaResponse>{
    try{
        if(!sequelize.isDefined) return responseFactory({body: 'No se ha inicializado la base de datos', statusCode: 500})
        let finalEvent = event;
        getEntity(event.headers)
        saveLog(event);
        if(validators){
            finalEvent = validate(validators, event);
        }
        const {body, statusCode} = await domain(finalEvent);
        return responseFactory({body, statusCode: statusCode || 200});
    }catch(error){
        if(error instanceof HTTPError){
            console.error(error.message);
            return responseFactory({
                body: error,
                statusCode: error.statusCode,
            })
        }else{
            console.error('ERROR INESPERADO DEL SERVIDOR');
            console.dir(error);
            return responseFactory({
                body: {
                    message: 'Error inesperado del servidor',
                },
                statusCode: 500
            })
        }
    }
}