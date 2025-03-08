import {Provider , IProvider } from 'models/Provider';
import { ApiGatewayParsedEvent } from 'types/response-factory/proxies';
import { Validators } from 'utils/Validator';
import { LambdaResolver } from 'utils/lambdaResolver';
interface Event extends ApiGatewayParsedEvent {
    body: IProvider
}

const domain = async (event:Event): Promise<{body:number, statusCode:number}> => {
    const parsedBody = typeof event.body == 'string' ? JSON.parse(event.body as unknown as string): event.body;
    console.log(parsedBody);
    const provider = await Provider.create(parsedBody);
    return {
        body: provider.id,
        statusCode: 200
    }    
}

export const Handler = (event:ApiGatewayParsedEvent)=>LambdaResolver(event, domain, [Validators.ADMIN_PERMISSION,Validators.OFFSET_AND_LIMITS])