import { Client } from 'models/Client';
import { SaleStates } from 'models/Enums';
import { Product } from 'models/Product';
import { Provider } from 'models/Provider';
import { Sale, SaleComplete, SaleWithProductAndProductsSale } from 'models/Sale';
import { Op } from 'sequelize';
import { ApiGatewayParsedEvent } from 'types/response-factory/proxies';
import { LambdaResolver } from 'utils/lambdaResolver';
import { recalculateTotal } from 'utils/utils';
interface Event extends ApiGatewayParsedEvent {}

type whereCondition = {
    deleted: boolean,
    entity: string,
    state?: string|any
}

const domain = async (event:Event): Promise<{body:SaleWithProductAndProductsSale[], statusCode:number}> => {
    let where:whereCondition = {
        deleted: false,
        entity: event.headers.entity,
    };
    if (event.queryStringParameters.state && event.queryStringParameters.state !== SaleStates.comprobante ) {
        where =  {
            ...where,
            state: event.queryStringParameters.state,
        }
    }
    if (event.queryStringParameters.state && event.queryStringParameters.state == SaleStates.comprobante ) {
        where =  {
            ...where,
            state: {
                [Op.notIn]: [SaleStates.presupuesto, SaleStates.proforma]
            }
        }
    }
    const sales = await Sale.findAll({
        where,
        attributes:{
            exclude: ['deleted']
        },
        include: [
            {
                model: Client,
            },
            {model: Product,
                attributes: { exclude: ['deleted']},
                as: 'products', 
                through: {
                    attributes: { exclude: ['deleted', 'saleId', 'productId'] }, as: 'saleProduct'},
                    include: [{model: Provider, as: 'provider'}]
            }
        ]
    }) as unknown as SaleComplete[];
    const salesTotalFormatted = sales.map((sale:SaleComplete)=>{
        const hasDiscount = sale.products.some((p:any)=>p.saleProduct.discount && p.saleProduct.discount>0);
        const total = recalculateTotal(hasDiscount,sale as unknown as SaleComplete);
        return {
            ...sale.get({plain: true}),
            total
        }
    })
    return {
        body: salesTotalFormatted,
        statusCode: 200
    }    
}

export const Handler = (event:ApiGatewayParsedEvent)=>LambdaResolver(event, domain, [])