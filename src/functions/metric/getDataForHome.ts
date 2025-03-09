import { Client } from 'models/Client';
import { Product } from 'models/Product';
import { Sale } from 'models/Sale';
import { SaleProduct } from 'models/SaleProduct';
import { Op, Sequelize } from 'sequelize';
import { ApiGatewayParsedEvent } from 'types/response-factory/proxies';
import { LambdaResolver } from 'utils/lambdaResolver';
interface Event extends ApiGatewayParsedEvent {

}

const domain = async (event:Event): Promise<{body:{}, statusCode:number}> => {
    // obtener las ventas, en estado que no sea presupuesto ni proforma, que estén proximas a la fecha de entrega. Ordernarlas por mas cercanas a la entrega
    const nextDeliverySales = await Sale.findAll({
        where: {
            state: {[Op.notIn]: ['presupuesto', 'proforma', 'canceled', 'finished']},
            deadline: {[Op.gte]: new Date()}
        },
        include: [{
            model: Client,
            attributes: ['name']
        }],
        order: [['deadline', 'ASC']]
    });

    // obtener el acumulado de ventas mensual de las ventas que no sean presupuestos, de los ultimos 6 meses, para poder graficarlo en un gráfico de líneas
    // donde el dataset, sean en la linea Y el monto y la linea X los meses

    const salesByMonth = await Sale.findAll({
        where: {
            state: { [Op.notIn]: ['presupuesto', 'proforma', 'canceled'] },
            deadline: { [Op.gte]: Sequelize.literal('NOW() - INTERVAL 12 MONTH') }
        },
        attributes: [
            [Sequelize.fn('DATE_FORMAT', Sequelize.col('createdAt'), '%Y-%m'), 'month'], 
            [Sequelize.fn('SUM', Sequelize.col('total')), 'total']
        ],
        group: [Sequelize.fn('DATE_FORMAT', Sequelize.col('createdAt'), '%Y-%m')],
        order: [[Sequelize.literal('month'), 'ASC']]
    });

    // const salesByDays = await Sale.findAll({
    //     where: {
    //         state: { [Op.notIn]: ['presupuesto', 'proforma', 'canceled'] },
    //     },
    //     attributes: [
    //         [Sequelize.fn('DATE', Sequelize.col('createdAt')), 'month'],  // Agrupamos por día
    //         [Sequelize.fn('SUM', Sequelize.col('total')), 'total']
    //     ],
    //     group: [Sequelize.fn('DATE', Sequelize.col('createdAt'))],  // Agrupamos por día
    //     order: [[Sequelize.literal('month'), 'ASC']]
    // });
    // Obtener los productos mas demandados del último mes, sin importar el estado de la venta

    const mostDemandProducts = await SaleProduct.findAll({
        attributes: [
            [Sequelize.col('product.id'), 'productId'],
            [Sequelize.col('product.name'), 'productName'],
            [Sequelize.col('product.code'), 'code'],
            [Sequelize.col('product.salePrice'), 'salePrice'],
            [Sequelize.col('product.purchasePrice'), 'purchasePrice'],
            [Sequelize.col('product.providerId'), 'providerId'],
            [Sequelize.col('product.productType'), 'productType'],
            [Sequelize.col('product.img'), 'img'],
            [Sequelize.fn('SUM', Sequelize.col('quantity')), 'total_quantity']
        ],
        include: [
            {
                model: Product,
                as: 'product',
                attributes: []
            },
            {
                model: Sale,
                as: 'sale',
                attributes: [],
                where: {
                    deadline: { [Op.gte]: Sequelize.literal('NOW() - INTERVAL 1 MONTH') }
                }
            }
        ],
        group: ['product.id'],
        order: [[Sequelize.literal('total_quantity'), 'DESC']],
        limit: 10
    });
    
    // Armo un array para devolver esto a front 

    const data = {
        nextDeliverySales,
        salesGraph: salesByMonth,
        mostDemandProducts
    }
    return {
        body:data,
        statusCode: 200
    }
}

export const Handler = (event:ApiGatewayParsedEvent)=>LambdaResolver(event, domain, [])