import {Provider, IProvider } from 'models/Provider';
import { ApiGatewayParsedEvent } from 'types/response-factory/proxies';
import { Validators } from 'utils/Validator';
import { LambdaResolver } from 'utils/lambdaResolver';

interface Event extends ApiGatewayParsedEvent {}

const domain = async (event:Event): Promise<{body:IProvider[], statusCode:number}> => {
    const providers = await Provider.findAll({ 
        where: {
            name: event.queryStringParameters
        },
        attributes: { exclude: ['deleted'] }
    });
    return {
        body: providers as IProvider[],
        statusCode: 200
    }
}

export const Handler = (event:ApiGatewayParsedEvent)=>LambdaResolver(event, domain, [Validators.OFFSET_AND_LIMITS])