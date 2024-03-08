import { Client } from 'models/Client';
import { Sale } from 'models/Sale';
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
    console.log(event.pathParameters.idClient);
    const client = await Client.findByPk(event.pathParameters.idClient, {include: Sale}) as ClientResponse
    if(!client){return {body: null, statusCode: 404}}
    const profitableSales = client?.sales?.map(sale => sale.get({ plain: true }))
                                        .filter(sale => !['proforma', 'presupuesto'].includes(sale.state));
    const totalDue = profitableSales?.reduce((acc, sale) => acc + parseFloat(sale.total), 0);
    const totalPaid = profitableSales?.reduce((acc, sale) => acc + parseFloat(sale.paid), 0);
    const clientPlain = client.get({ plain: true })
    clientPlain.totalDue = totalDue;
    clientPlain.totalPaid = totalPaid;
    return {
        body: clientPlain,
        statusCode: 200
    }
}

export const Handler = (event:ApiGatewayParsedEvent)=>LambdaResolver(event, domain, [Validators.ID_CLIENT])