import {Client , IClient } from 'models/Client';
import { ApiGatewayParsedEvent } from 'types/response-factory/proxies';
import { Validators } from 'utils/Validator';
import { LambdaResolver } from 'utils/lambdaResolver';
interface Event extends ApiGatewayParsedEvent {
    pathParameters: {
        idClient: string
    }
    body: IClient
}

const domain = async (event:Event): Promise<{body:string, statusCode:number}> => {
    const idClient = parseInt(event.pathParameters.idClient);
    const parsedBody = typeof event.body == 'string' ? JSON.parse(event.body as unknown as string): event.body;
    await Client.update(parsedBody, {where: {id: idClient}});
    return {
        body: 'updated',
        statusCode: 200
    }

}

export const Handler = (event:ApiGatewayParsedEvent)=>LambdaResolver(event, domain, [Validators.SUPERVISOR_PERMISSION,Validators.ID_CLIENT])