import { Product, IProduct } from 'models/Product';
import { Provider } from 'models/Provider';
import { ApiGatewayParsedEvent } from 'types/response-factory/proxies';
import { Validators } from 'utils/Validator';
import { LambdaResolver } from 'utils/lambdaResolver';
interface Event extends ApiGatewayParsedEvent {
    queryStringParameters: {limit: string, offset: string}
}

const domain = async (event:Event): Promise<{body:IProduct[], statusCode:number}> => {
    const {limit, offset} = event.queryStringParameters;
    const products = await Product.findAll({
        limit: parseInt(limit),
        offset: parseInt(offset),
        where: { deleted: false },
        include: {
            model: Provider,
            as:'provider',
            attributes: { exclude: ['deleted'] }
        }, attributes: { exclude: ['deleted'] }
    });
    return {
        body: products as IProduct[],
        statusCode: 200
    }
}

export const Handler = (event:ApiGatewayParsedEvent)=>LambdaResolver(event, domain, [Validators.OFFSET_AND_LIMITS])