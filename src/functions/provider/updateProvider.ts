import {Provider , IProvider } from 'models/Provider';
import { ApiGatewayParsedEvent } from 'types/response-factory/proxies';
import { Validators } from 'utils/Validator';
import { LambdaResolver } from 'utils/lambdaResolver';
interface Event extends ApiGatewayParsedEvent {
    pathParameters: {idProvider: string}
    body: IProvider
}

const domain = async (event:Event): Promise<{body:number, statusCode:number}> => {
    const idProvider = event.pathParameters.idProvider;
    const parsedBody = typeof event.body === 'string'? JSON.parse(event.body) : event.body;
    console.log(parsedBody);
    const provider = await Provider.update(parsedBody, {where: {id: idProvider}});
    return {
        body: provider[0],
        statusCode: 200
    }

}

export const Handler = (event:ApiGatewayParsedEvent)=>LambdaResolver(event, domain, [Validators.SUPERVISOR_PERMISSION,Validators.ID_PROVIDER, Validators.VALID_JSON])