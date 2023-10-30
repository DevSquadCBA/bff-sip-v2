import Client, { IClient } from 'models/Client';
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
    return {
        body: await Client.getAll(event.queryStringParameters.offset, event.queryStringParameters.limit) as IClient[],
        statusCode: 200
    }
}

export const Handler = (event:ApiGatewayParsedEvent)=>LambdaResolver(event, domain, [Validators.OFFSET_AND_LIMITS])