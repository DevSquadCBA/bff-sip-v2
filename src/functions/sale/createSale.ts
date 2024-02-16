import {Sale , ISale } from 'models/Sale';
import { SaleProduct } from 'models/SaleProduct';
import { ApiGatewayParsedEvent } from 'types/response-factory/proxies';
import { Validators } from 'utils/Validator';
import { LambdaResolver } from 'utils/lambdaResolver';
interface Event extends ApiGatewayParsedEvent {
    body: ISale
}

const domain = async (event:Event): Promise<{body:number, statusCode:number}> => {
    try{
        const parsedBody = JSON.parse(event.body as unknown as string);
        const {products} = parsedBody;
        delete parsedBody.products;
        const sale = parsedBody as ISale;
        const budget = await Sale.create(sale);
        if(products.length === 0) return {
            body: budget.id,
            statusCode: 200
        }
        try{
            for(const product of products){
                product.saleId = budget.id;
                product.productId = product.id;
                await SaleProduct.create(product);
            }
        }catch(e:any){
            Sale.destroy({where: {id: budget.id}});
            throw new Error(e);
        }
        return {
            body: budget.id,
            statusCode: 200
        }    
    }catch(e:any){
        console.error(e);
        throw new Error(e);
    }
}

export const Handler = (event:ApiGatewayParsedEvent)=>LambdaResolver(event, domain, [Validators.OFFSET_AND_LIMITS])