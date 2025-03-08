import {Product , IProduct } from 'models/Product';
import { ApiGatewayParsedEvent } from 'types/response-factory/proxies';
import { Validators } from 'utils/Validator';
import { LambdaResolver } from 'utils/lambdaResolver';
interface Event extends ApiGatewayParsedEvent {
    pathParameters:{
        idProduct: string
    }
    body: IProduct
}

const domain = async (event:Event): Promise<{body:boolean, statusCode:number}> => {
    const idProduct = event.pathParameters.idProduct;
    const parsedBody = JSON.parse(event.body as unknown as string);
    await Product.update(parsedBody, {where: {id: idProduct}});
    return {
        body: true,
        statusCode: 200
    }

}

export const Handler = (event:ApiGatewayParsedEvent)=>LambdaResolver(event, domain, [Validators.SUPERVISOR_PERMISSION,Validators.ID_PRODUCT])