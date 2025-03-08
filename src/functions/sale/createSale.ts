import {Sale , ISale } from 'models/Sale';
import { SaleProduct } from 'models/SaleProduct';
import { BadRequestError, UnauthorizedError } from 'types/errors';
import { ApiGatewayParsedEvent } from 'types/response-factory/proxies';
import { Validators } from 'utils/Validator';
import { LambdaResolver } from 'utils/lambdaResolver';
import {getEntityList} from 'models/Enums';
import { Product, ResponseGetPricesFromIds } from 'models/Product';
import { getNameFromToken, getRoleFromToken } from 'functions/utils/tokenUtils';
import { Roles } from 'models/Rol';
interface Event extends ApiGatewayParsedEvent {
    headers:{
        authorization:string,
        entity:string
    }
    body: ISale & {products:ResponseGetPricesFromIds& {discount?:number}[]}
}

const domain = async (event:Event): Promise<{body:number, statusCode:number}> => {
    try{
        const parsedBody = typeof event.body == 'string' ? JSON.parse(event.body as unknown as string): event.body;
        const {products} = parsedBody;

        delete parsedBody.products;
        console.log(parsedBody);
        console.log({products})
        const sale = parsedBody as ISale;
        
        // Obtener los precios originales, para evitar la manipulación de percios en el frontend
        const productsWithPrice = await Product.getPricesFromIds(products) as unknown as ResponseGetPricesFromIds[];

        sale.entity = getEntityList(event.headers.entity);

        const hasDiscount = products.some((p:any)=>p.discount && p.discount>0);
        let productsToAdd:ResponseGetPricesFromIds[];
        if(hasDiscount){ // check if user is admin or has permissions to create sale with discount
            if(!event.headers.authorization){throw new UnauthorizedError('No autorizado');}
            const role = getRoleFromToken(event.headers.authorization.replace('Bearer ', ''));
            if(role != Roles.ADMIN && role != Roles.SUPERVISOR){throw new UnauthorizedError('No autorizado');}
            //+(((foundProduct.quantity || 0) * (foundProduct.salePrice)) * newDiscount).toFixed(2)
            sale.total = products.reduce((acc: number, product: any)=>acc + ((product.salePrice * product.quantity) * ( product.discount)).toFixed(2), 0);
            productsToAdd = products.map((product:any)=>({...product, discount: product.discount || 0, price: +((product.salePrice * product.quantity) * ( product.discount)).toFixed(2)}));
        }else{
            sale.total = productsWithPrice.reduce((acc: number, product: any)=>acc + (parseFloat(product.salePrice) * product.quantity), 0)
            productsToAdd = productsWithPrice.map((product:any)=>({...product, discount: 0, price: +(parseFloat(product.salePrice) * product.quantity).toFixed(2)}));
        }

        sale.seller = getNameFromToken(event.headers.authorization.replace('Bearer ', ''));
        //sale.estimatedDays = Math.ceil(Math.max(...productsWithPrice.map(product=>product.daysDelay))/10)*10;
        const budget = await Sale.create(sale);

                
        if(productsToAdd.length === 0) return {
            body: budget.id,
            statusCode: 200
        }
        try{
            SaleProduct.bulkCreate(productsToAdd.map(product=>({
                saleId: budget.id, 
                productId: product.id, 
                quantity: product.quantity,
                discount: product.discount || 0,
                price: product.price,
            })));
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