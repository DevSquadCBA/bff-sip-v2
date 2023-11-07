import Product, { IProduct } from 'models/Product';
import { ApiGatewayParsedEvent } from 'types/response-factory/proxies';
import { Validators } from 'utils/Validator';
import { LambdaResolver } from 'utils/lambdaResolver';
interface Event extends ApiGatewayParsedEvent {
    pathParameters:{
        idProduct:string
    }
}

const domain = async (event:Event): Promise<{body:IProduct, statusCode:number}> => {
    const product = await Product.getById(event.pathParameters.idProduct)
    return {
        body: product as IProduct,
        statusCode: 200
    }
}

export const Handler = (event:ApiGatewayParsedEvent)=>LambdaResolver(event, domain, [Validators.ID_PRODUCT])