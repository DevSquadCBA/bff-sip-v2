import { ISaleProduct, SaleProduct } from "models/SaleProduct"
import { ApiGatewayParsedEvent } from "types/response-factory/proxies"
import { LambdaResolver } from "utils/lambdaResolver"
import { Validators } from "utils/Validator"

interface Event extends ApiGatewayParsedEvent {
    pathParameters: {
        idSale: string
    },
    body: string
}

const domain = async (event:Event): Promise<{body:string, statusCode:number}> => {
    const id = parseInt(event.pathParameters.idSale)
    const products = typeof event.body === 'string'? JSON.parse(event.body) as Partial<ISaleProduct>[] : event.body;
    const sale = await SaleProduct.findByPk(id);
    if(!sale){throw new Error('sale not found');}
    SaleProduct.bulkUpdate(id, products);
    return {body: 'ok', statusCode: 200}

}
export const Handler = (event:ApiGatewayParsedEvent)=>LambdaResolver(event, domain, [Validators.ID_SALE, Validators.VALID_JSON])