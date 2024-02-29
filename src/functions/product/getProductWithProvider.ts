import { Product, IProduct } from 'models/Product';
import { Provider } from 'models/Provider';
import { ApiGatewayParsedEvent } from 'types/response-factory/proxies';
import { LambdaResolver } from 'utils/lambdaResolver';
interface Event extends ApiGatewayParsedEvent {}

const domain = async (event:Event): Promise<{body:IProduct[], statusCode:number}> => {
    const products = await Product.findAll({
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

export const Handler = (event:ApiGatewayParsedEvent)=>LambdaResolver(event, domain, [])