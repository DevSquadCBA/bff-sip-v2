import dayjs from 'dayjs';
import { Client, IClient } from 'models/Client';
import { IProduct, Product } from 'models/Product';
import { Provider } from 'models/Provider';
import { Sale,  ISale } from 'models/Sale';
import { SaleProduct } from 'models/SaleProduct';
import { ApiGatewayParsedEvent } from 'types/response-factory/proxies';
import { Validators } from 'utils/Validator';
import { LambdaResolver } from 'utils/lambdaResolver';
interface Event extends ApiGatewayParsedEvent {
    queryStringParameters: {
        offset: string
        limit: string
    },
    pathParameters: {
        idClient: string
    }
}

function differenceInCalendarDays(createdAt:string, estimatedDays:number, now: Date): Date { 
    const creationDate = dayjs(createdAt);
    const daysToDeadLine = creationDate.add(estimatedDays, 'day');
    return daysToDeadLine.toDate();
}

type SaleComplete = ISale & {
    createdAt: string,
    distinctProviders: number,
    daysToDueDate: number,
    total: number
    client: IClient,
    products: (IProduct & {
        provider: Provider
        saleProduct: SaleProduct
    })[],
    get: ({plain}:{plain: boolean}) => any
}

const domain = async (event:Event): Promise<{body:ISale[], statusCode:number}> => {
    const offset = parseInt(event.queryStringParameters.offset);
    const limit = parseInt(event.queryStringParameters.limit);
    const idClient = parseInt(event.pathParameters.idClient);
    const entity = event.headers.entity;
    let sales = await Sale.findAll({
        where:{
            clientId: idClient,
            deleted: false,
            entity
        },
        include: [
            {model: Client,attributes: { exclude: ['deleted'] }},
            {model: Product,
                attributes: { exclude: ['deleted']},
                as: 'products', 
                through: {
                    attributes: { exclude: ['deleted', 'saleId', 'productId'] }, as: 'saleProduct'},
                    include: [{model: Provider, as: 'provider'}]
                },
        ],
        limit,
        offset
    })as unknown as SaleComplete[];
    
    if(!sales || sales.length === 0) return {
        body: [],
        statusCode: 201
    };
    sales = sales.map((saleInstance) => saleInstance.get({ plain: true }));
    sales = sales.map(sale => {
        const hasDiscount = sale.products.some((p:any)=>p.discount && p.discount>0);
        const allProviderIds = sale.products.map(product => product.providerId);
        const distinctProviders = [...new Set(allProviderIds)];
        const productsCount = sale.products.length;
        const total = hasDiscount 
            ? sale.products.reduce((acc: number, product: any) => acc + (product.saleProduct.price * product.quantity) * product.discount, 0)
            : sale.products.reduce((acc, product) => acc + product.saleProduct.price * product.saleProduct.quantity, 0);
        return {
          ...sale,
          distinctProviders: distinctProviders.length,
          productsCount,
          deadline:differenceInCalendarDays(sale.createdAt,sale.estimatedDays, new Date()),
          total
        };
    });

    return {
      body: sales,
      statusCode: 200
    };
}

export const Handler = (event:ApiGatewayParsedEvent)=>LambdaResolver(event, domain, [Validators.OFFSET_AND_LIMITS, Validators.ID_CLIENT])

