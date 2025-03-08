import { Client } from 'models/Client';
import { Sale } from 'models/Sale';
import { Op } from 'sequelize';
import { NotFoundError } from 'types/errors';
import { ApiGatewayParsedEvent } from 'types/response-factory/proxies';
import { Validators } from 'utils/Validator';
import { LambdaResolver } from 'utils/lambdaResolver';
interface Event extends ApiGatewayParsedEvent {
    pathParameters:{
        idClient:string
    }
}
type ClientResponse = Client & {totalDue:number, totalPaid:number};

const domain = async (event:Event): Promise<{body:ClientResponse|null, statusCode:number}> => {
    const client = await Client.findByPk(event.pathParameters.idClient, {include: Sale}) as ClientResponse
    if(!client){
        throw new NotFoundError('No existe el cliente')
    };
    const profitableSales = client?.sales?.map(sale => sale.get({ plain: true }))
                                        .filter(sale => !['proforma', 'presupuesto']
                                        .includes(sale.state));
    const totalDue = profitableSales?.reduce((acc, sale) => acc + parseFloat(sale.total), 0);
    const totalPaid = profitableSales?.reduce((acc, sale) => acc + parseFloat(sale.paid), 0);
    
    // get the next sale to be delivered, obtaining all sales, ordered by deadline to more closest, excepting for presupuesto and proforma, give one, the closes
    const sales = await Sale.findAll({where: {clientId: client.id, state: { [Op.notIn]: ['proforma', 'presupuesto', 'canceled', 'finished'] }}, order: [['deadline', 'ASC']]})
    const closestSale = sales[0];

    const clientPlain = client.get({ plain: true })
    clientPlain.totalDue = totalDue;
    clientPlain.totalPaid = totalPaid;
    clientPlain.closestSale = closestSale;
    return {
        body: clientPlain,
        statusCode: 200
    }
}

export const Handler = (event:ApiGatewayParsedEvent)=>LambdaResolver(event, domain, [Validators.ID_CLIENT])