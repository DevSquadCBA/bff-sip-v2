import {Sale , ISale } from 'models/Sale';
import { SaleProduct } from 'models/SaleProduct';
import { BadRequestError, InvalidIdError } from 'types/errors';
import { ApiGatewayParsedEvent } from 'types/response-factory/proxies';
import { Validators } from 'utils/Validator';
import { LambdaResolver } from 'utils/lambdaResolver';
import { Log } from 'utils/utils';
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
        Log.info({message: `Se ha creado el presupuesto con el id ${budget.id}`});
        console.dir(budget);
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
            if(e instanceof BadRequestError && e.code == 'ER_BAD_NULL_ERROR'){
                throw new BadRequestError('El id del producto no existe');
            }
            throw new BadRequestError(e.message);
        }
        return {
            body: budget.id,
            statusCode: 200
        }    
    }catch(e:any){
        console.error(e);
        throw e;
    }
}

export const Handler = (event:ApiGatewayParsedEvent)=>LambdaResolver(event, domain, [Validators.OFFSET_AND_LIMITS])