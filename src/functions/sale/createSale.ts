import {Sale , ISale } from 'models/Sale';
import { ApiGatewayParsedEvent } from 'types/response-factory/proxies';
import { Validators } from 'utils/Validator';
import { LambdaResolver } from 'utils/lambdaResolver';
interface Event extends ApiGatewayParsedEvent {
    body: ISale
}

const domain = async (event:Event): Promise<{body:number, statusCode:number}> => {
    const parsedBody = JSON.parse(event.body as unknown as string);
    const {sale} = parsedBody.sale;
    const {products} = parsedBody.products;
    const budget = await Sale.create(sale);
    //await budget.addProduct(products);
    return {
        body: budget.id,
        statusCode: 200
    }    
}

export const Handler = (event:ApiGatewayParsedEvent)=>LambdaResolver(event, domain, [Validators.OFFSET_AND_LIMITS])