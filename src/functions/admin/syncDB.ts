import { ApiGatewayParsedEvent } from 'types/response-factory/proxies';
import { LambdaResolver } from 'utils/lambdaResolver';
import sequelize from "../../services/sequelize";
import { createStores } from "services/generateStoreProcedures";

interface Event extends ApiGatewayParsedEvent {
    headers:{
        Entity: string
        Admin: string
    }
}

const domain = async (event:Event): Promise<{body:string, statusCode:number}> => {
    const admin = event.headers.Admin;
    if('astrodev'!= admin){
        return {
            body: 'not authorized',
            statusCode: 401
        }
    }
    await sequelize.sync({alter:true})
    await createStores(sequelize);
    return {
        body: 'ok',
        statusCode: 200
    }    
}

export const Handler = (event:ApiGatewayParsedEvent)=>LambdaResolver(event, domain, [])