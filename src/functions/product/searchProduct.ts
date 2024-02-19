import {Product, IProduct } from 'models/Product';
import { ApiGatewayParsedEvent } from 'types/response-factory/proxies';
import { Validators } from 'utils/Validator';
import { LambdaResolver } from 'utils/lambdaResolver';

interface Event extends ApiGatewayParsedEvent {}

const domain = async (event:Event): Promise<{body:IProduct[], statusCode:number}> => {
    const products = await Product.findAll({ 
        where: {
            name: event.queryStringParameters
        },
        attributes: { exclude: ['deleted'] }
    });
    return {
        body: products as IProduct[],
        statusCode: 200
    }
}

export const Handler = (event:ApiGatewayParsedEvent)=>LambdaResolver(event, domain, [Validators.OFFSET_AND_LIMITS])