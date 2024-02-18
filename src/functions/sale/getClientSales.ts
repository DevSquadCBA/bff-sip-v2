import { Sale,  ISale } from 'models/Sale';
import { where } from 'sequelize';
import { ApiGatewayParsedEvent } from 'types/response-factory/proxies';
import { Validators } from 'utils/Validator';
import { LambdaResolver } from 'utils/lambdaResolver';
interface Event extends ApiGatewayParsedEvent {
    queryStringParameters: {
        offset: string
        limit: string
    },
    pathParameters: {
        idClient: string
    }
}

const domain = async (event:Event): Promise<{body:ISale[], statusCode:number}> => {
    const offset = parseInt(event.queryStringParameters.offset);
    const limit = parseInt(event.queryStringParameters.limit);
    const idClient = parseInt(event.pathParameters.idClient);

    const budgets = await Sale.findAll({
        offset, limit,
        attributes:{exclude: ['deleted']}, 
        where:{
            clientId: idClient,
            deleted: false,
        },
        }) as ISale[];

    return {
        body: budgets,
        statusCode: 200
    }    
}

export const Handler = (event:ApiGatewayParsedEvent)=>LambdaResolver(event, domain, [Validators.OFFSET_AND_LIMITS, Validators.ID_CLIENT])