import { Client } from 'models/Client';
import { Product } from 'models/Product';
import { Provider } from 'models/Provider';
import { Sale,  ISale } from 'models/Sale';
import { Sequelize } from 'sequelize';
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

const domain = async (event:Event): Promise<{body:ISale[], statusCode:number}> => {
    const offset = parseInt(event.queryStringParameters.offset);
    const limit = parseInt(event.queryStringParameters.limit);
    const idClient = parseInt(event.pathParameters.idClient);
    const entity = event.headers.entity;
    const budgets = await Sale.findAll({
        offset,
        limit,
        where: {
            clientId: idClient,
            entity
        },
        attributes: {
            exclude: ['deleted'],
            include: [
                [
                    Sequelize.literal(`(
                        SELECT COUNT(DISTINCT p.providerId) 
                        FROM sale_product sp
                        INNER JOIN products p ON p.id = sp.productId
                        WHERE sp.saleId = Sale.id
                    )`),
                    'distinctProviders'
                ],
                [
                    Sequelize.literal(`(
                        SELECT COALESCE(SUM(p.salePrice * sp.quantity), 0)
                        FROM sale_product sp
                        INNER JOIN products p ON p.id = sp.productId
                        WHERE sp.saleId = Sale.id
                    )`),
                    'granTotal'
                ],
                [
                    Sequelize.literal(`(
                        SELECT COUNT(DISTINCT sp.productId)
                        FROM sale_product sp
                        WHERE sp.saleId = Sale.id
                    )`),
                    'productsCount'
                ],
                [
                    Sequelize.literal(`DATEDIFF(Sale.deadline, NOW())`),
                    'daysRemaining'
                ]
            ]
        },
        include: [
            {
                model: Client,
                attributes: { exclude: ['deleted'] },
                where: { deleted: false }
            },
            {
                model: Product,
                as: 'products',
                attributes: ['id', 'name', 'code', 'providerId', 'salePrice'],
                include: [
                    {
                        model: Provider,
                        as: 'provider',
                        attributes: ['id', 'name']
                    },
                ],
                

            }
        ]
    }) as ISale[];
    
    return {
        body: budgets,
        statusCode: 200
    }    
}

export const Handler = (event:ApiGatewayParsedEvent)=>LambdaResolver(event, domain, [Validators.OFFSET_AND_LIMITS, Validators.ID_CLIENT])