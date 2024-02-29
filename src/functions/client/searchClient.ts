import {Client, IClient } from 'models/Client';
import { ApiGatewayParsedEvent } from 'types/response-factory/proxies';
import { Validators } from 'utils/Validator';
import { LambdaResolver } from 'utils/lambdaResolver';

interface Event extends ApiGatewayParsedEvent {
    queryStringParameters: {
        name: string
    }
}

const domain = async (event:Event): Promise<{body:IClient[], statusCode:number}> => {
    const clients = await Client.findAll({ 
        where: {
            name: event.queryStringParameters
        },
        attributes: { exclude: ['deleted'] }
    });
    return {
        body: clients as IClient[],
        statusCode: 200
    }
}

export const Handler = (event:ApiGatewayParsedEvent)=>LambdaResolver(event, domain, [Validators.QUERY])