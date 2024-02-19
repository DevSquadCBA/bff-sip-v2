import { Product } from 'models/Product';
import { Sale } from 'models/Sale';
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
type ProductsInSale = {code: string, name: string, salePrice: number, purchasePrice: number, saleProducts?: { quantity: number, state: string },quantity?: number, state?: string}
type SaleWithProduct = Sale & {products: ProductsInSale[]}

const domain = async (event:Event): Promise<{body:Sale[], statusCode:number}> => {
    const offset = parseInt(event.queryStringParameters.offset);
    const limit = parseInt(event.queryStringParameters.limit);

    let sales = await Sale.findAll({
        offset,
        limit,
        include:{
            model: Product,
            attributes: ['code','name', 'salePrice', 'purchasePrice'],
            as: 'products',
            through:{
                model: SaleProduct,
                attributes: ['quantity', 'state'],
                as: 'saleProducts'
            } as any
        }
    }) as SaleWithProduct[];
    sales = sales.map(saleRaw=>{
        const sale = saleRaw.get({ plain: true });
        sale.products = sale.products.map((product:ProductsInSale)=>{
            return {
                code: product.code,
                name: product.name,
                salePrice: product.salePrice,
                purchasePrice: product.purchasePrice,
                quantity: product.saleProducts?.quantity,
                state: product.saleProducts?.state
            }
        });
        return sale;
    })
    

    return {
        body: sales,
        statusCode: 200
    }    
}

export const Handler = (event:ApiGatewayParsedEvent)=>LambdaResolver(event, domain, [Validators.OFFSET_AND_LIMITS])