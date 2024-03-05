import { Client } from 'models/Client';
import { Product } from 'models/Product';
import { ProductsInSale, Sale, SaleWithProduct } from 'models/Sale';
import { SaleProduct } from 'models/SaleProduct';
import { ApiGatewayParsedEvent } from 'types/response-factory/proxies';
import { Validators } from 'utils/Validator';
import { LambdaResolver } from 'utils/lambdaResolver';
interface Event extends ApiGatewayParsedEvent {
    queryStringParameters: {
        offset: string
        limit: string
    }
}


const domain = async (event:Event): Promise<{body:SaleWithProduct[], statusCode:number}> => {
    const offset = parseInt(event.queryStringParameters.offset);
    const limit = parseInt(event.queryStringParameters.limit);

    const sales = await Sale.findAll({
        offset,
        limit,
        subQuery:false,
        where:{
            deleted: false,
            entity: event.headers.entity
        },
        attributes:{
            exclude: ['deleted']
        },
        include: [
            {
                model: Client,
            },
            {
            model: Product,
            attributes: ['id', 'code', 'name', 'salePrice', 'purchasePrice'],
            as: 'products',
            through: {
                model: SaleProduct,
                attributes: ['quantity','state','details'],
                as: 'saleProducts'
            } as any
        }]
    });
    const salesWithProduct:SaleWithProduct[] = sales.map(saleRaw=>{
        const sale = saleRaw.get({ plain: true });
        sale.products = sale.products.map((product:ProductsInSale)=>{
            return {
                id: product.id,
                code: product.code,
                name: product.name,
                salePrice: product.salePrice,
                purchasePrice: product.purchasePrice,
                quantity: product.saleProducts?.quantity,
                state: product.saleProducts?.state,
                details: product.saleProducts?.details || ''
            }
        });
        return sale;
    })
    

    return {
        body: salesWithProduct,
        statusCode: 200
    }    
}

export const Handler = (event:ApiGatewayParsedEvent)=>LambdaResolver(event, domain, [Validators.OFFSET_AND_LIMITS])