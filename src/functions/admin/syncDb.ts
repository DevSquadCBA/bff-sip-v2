import { ApiGatewayParsedEvent } from  'types/response-factory/proxies';
import { LambdaResolver } from 'utils/lambdaResolver';
import sequelize from "services/sequelize";
import { createStores } from "services/generateStoreProcedures";

interface Event extends ApiGatewayParsedEvent {
    headers:{
        entity: string
        Admin?: string
        admin?:string
    }
}

const domain = async (event:Event): Promise<{body:string, statusCode:number}> => {
    const admin = event.headers.admin || event.headers['Admin'];
    if('astrodev'!= admin){
        return {
            body: 'not authorized',
            statusCode: 401
        }
    }
    try{
        // check if db exists
        await sequelize.authenticate();
        console.log('db exists');
    }catch(e){
        // create db
        await sequelize.sync();
    }
    await sequelize.sync({alter:true, force:false})
    await createStores(sequelize);
    return {
        body: 'ok',
        statusCode: 200
    }    
}

export const Handler = (event:ApiGatewayParsedEvent)=>LambdaResolver(event, domain, [])
