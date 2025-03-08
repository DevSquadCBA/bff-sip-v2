import { Client } from 'models/Client';
import {Sale, ISale } from 'models/Sale';
import { Op, literal } from 'sequelize';
import { ApiGatewayParsedEvent } from 'types/response-factory/proxies';
import { Validators } from 'utils/Validator';
import { LambdaResolver } from 'utils/lambdaResolver';

interface Event extends ApiGatewayParsedEvent {
    queryStringParameters: {
        query: string
    }
}
// PIENSO que:
// el search deberia ser por estado (por si es proforma, presupuesto o comprobante) o por nombre o id de un cliente . Porque es un presupuesto.
const domain = async (event:Event): Promise<{body:ISale[], statusCode:number}> => {
    const query = event.queryStringParameters.query;
    const sales = await Sale.findAll({ 
        include: {
            model: Client,
            attributes:{exclude: ['deleted','createdAt','updatedAt','province','localidad','address']}
        },
        where: {
            [Op.or]: [
                {state: {[Op.like]: '%'+query+'%'}},
                {clientId : [{[Op.like]: '%'+query+'%'}]},
                literal(`client.name like '%${query}%'`)
            ]
        },
        attributes: { exclude: ['finished','deleted'] }
    });
    return {
        body: sales as ISale[],
        statusCode: 200
    }
}

export const Handler = (event:ApiGatewayParsedEvent)=>LambdaResolver(event, domain, [Validators.QUERY])