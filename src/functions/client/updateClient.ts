import {Client , IClient } from 'models/Client';
import { ApiGatewayParsedEvent } from 'types/response-factory/proxies';
import { Validators } from 'utils/Validator';
import { LambdaResolver } from 'utils/lambdaResolver';
interface Event extends ApiGatewayParsedEvent {
    body: IClient
}

const domain = async (event:Event): Promise<{body:number, statusCode:number}> => {
    const parsedBody = JSON.parse(event.body as unknown as string);
    console.log(parsedBody);
    const client = await Client.update(parsedBody, {where: {id: parsedBody.id}});
    return {
        body: client[0],
        statusCode: 200
    }

}

export const Handler = (event:ApiGatewayParsedEvent)=>LambdaResolver(event, domain, [Validators.OFFSET_AND_LIMITS])