import Client, { IClient } from 'models/Client';
import { ApiGatewayParsedEvent } from 'types/response-factory/proxies';
import { Validators } from 'utils/Validator';
import { LambdaResolver } from 'utils/lambdaResolver';
interface Event extends ApiGatewayParsedEvent {
    pathParameters:{
        idClient:string
    }
}

const domain = async (event:Event): Promise<{body:IClient, statusCode:number}> => {
    const client = await Client.getById(event.pathParameters.idClient)
    return {
        body: client as IClient,
        statusCode: 200
    }
}

export const Handler = (event:ApiGatewayParsedEvent)=>LambdaResolver(event, domain, [Validators.ID_CLIENT])