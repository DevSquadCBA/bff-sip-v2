import { Client , IClient } from 'models/Client';
import { ApiGatewayParsedEvent } from 'types/response-factory/proxies';
import { Validators } from 'utils/Validator';
import { LambdaResolver } from 'utils/lambdaResolver';
interface Event extends ApiGatewayParsedEvent {
    queryStringParameters: {
        offset: string
        limit: string
    }
}

const domain = async (event:Event): Promise<{body:IClient[], statusCode:number}> => {
    const offset = parseInt(event.queryStringParameters.offset);
    const limit = parseInt(event.queryStringParameters.limit);

    const clients = await Client.getClientsWithBudgetInfo( offset, limit) as IClient[];

    return {
        body: clients,
        statusCode: 200
    }    
}

export const Handler = (event:ApiGatewayParsedEvent)=>LambdaResolver(event, domain, [Validators.OFFSET_AND_LIMITS])