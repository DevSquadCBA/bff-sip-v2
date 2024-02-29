import { Client } from 'models/Client';
import { Product } from 'models/Product';
import { Sale, ISale, SaleWithProduct, ProductsInSale } from 'models/Sale';
import { SaleProduct } from 'models/SaleProduct';
import { InvalidIdError } from 'types/errors';
import { ApiGatewayParsedEvent } from 'types/response-factory/proxies';
import { Validators } from 'utils/Validator';
import { LambdaResolver } from 'utils/lambdaResolver';
interface Event extends ApiGatewayParsedEvent {
    pathParameters:{
        idSale:string
    },
}

const domain = async (event:Event): Promise<{body:ISale, statusCode:number}> => {
    const sale = await Sale.findByPk(event.pathParameters.idSale, {
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
                    attributes: ['quantity', 'state'],
                    as: 'saleProducts'
                } as any
            }
        ]
    })
    if(!sale){
        throw new InvalidIdError('La venta no existe');
    }
    const saleWithProduct = sale.get({ plain: true });
    saleWithProduct.products = saleWithProduct.products.map((product:ProductsInSale)=>{
        return {
            id: product.id,
            code: product.code,
            name: product.name,
            salePrice: product.salePrice,
            purchasePrice: product.purchasePrice,
            quantity: product.saleProducts?.quantity,
            state: product.saleProducts?.state
        }
    });
    
    return {
        body: saleWithProduct as ISale,
        statusCode: 200
    }
}

export const Handler = (event:ApiGatewayParsedEvent)=>LambdaResolver(event, domain, [Validators.ID_SALE])