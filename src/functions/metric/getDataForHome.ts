import { Product } from 'models/Product';
import { Sale } from 'models/Sale';
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
        order: [['deadline', 'ASC']]
    });

    // obtener el acumulado de ventas mensual de las ventas que no sean presupuestos, de los ultimos 6 meses, para poder graficarlo en un gráfico de líneas
    // donde el dataset, sean en la linea Y el monto y la linea X los meses

    const salesByMonth = await Sale.findAll({
        where: {
            state: {[Op.notIn]: ['presupuesto', 'proforma', 'canceled']},
            deadline: {[Op.gte]: new Date(new Date().setMonth(new Date().getMonth() - 6))}
        },
        attributes: [
            [Sequelize.fn('MONTH', Sequelize.col('createdAt')), 'month'],
            [Sequelize.fn('SUM', Sequelize.col('total')), 'total']
        ],
        group: [Sequelize.fn('MONTH', Sequelize.col('createdAt'))]  
    });
    
    // Obtener los productos mas demandados del último mes, sin importar el estado de la venta

    const mostDemandProducts = await Sale.findAll({
        where: {
            deadline: { [Op.gte]: new Date(new Date().setMonth(new Date().getMonth() - 1)) },
        },
        attributes: [
            [Sequelize.col('products.id'), 'productId'], 
            [Sequelize.fn('SUM', Sequelize.col('products->SaleProduct.quantity')), 'quantity']
        ],
        group: ['products.id'],  // Eliminamos `Sale.id` del GROUP BY
        include: [{
            model: Product,
            attributes: ['id', 'code', 'name', 'salePrice', 'purchasePrice', 'providerId', 'productType', 'img', 'createdAt', 'updatedAt'],
            as: 'products',
            through: { attributes: [] }
        }]
    });
    
    
    
    
    

    // Armo un array para devolver esto a front 

    const data = {
        nextDeliverySales,
        salesByMonth,
        mostDemandProducts
    }
    return {
        body:data,
        statusCode: 200
    }
}

export const Handler = (event:ApiGatewayParsedEvent)=>LambdaResolver(event, domain, [])