import { Product } from 'models/Product';
import { Provider } from 'models/Provider';
import { Sale } from 'models/Sale';
import { ApiGatewayParsedEvent } from 'types/response-factory/proxies';
import { LambdaResolver } from 'utils/lambdaResolver';
interface Event extends ApiGatewayParsedEvent {
}

type Response =  {
    sales: number,
    products: number,
    providers: number
}

const domain = async (event:Event): Promise<{body:Response, statusCode:number}> => {
    const countSales = await Sale.count({where: {deleted: false}})
    const countProducts = await Product.count({where: {deleted: false}});
    const countProviders = await Provider.count({where: {deleted: false}});
    return {
        body: {
            sales: countSales,
            products: countProducts,
            providers: countProviders
        },
        statusCode: 200
    }    
}

export const Handler = (event:ApiGatewayParsedEvent)=>LambdaResolver(event, domain, [])