import {Sale, ISale } from 'models/Sale';
import { ApiGatewayParsedEvent } from 'types/response-factory/proxies';
import { Validators } from 'utils/Validator';
import { LambdaResolver } from 'utils/lambdaResolver';

interface Event extends ApiGatewayParsedEvent {}
// PIENSO que:
// el search deberia ser por estado (por si es proforma, presupuesto o comprobante) o por nombre o id de un cliente . Porque es un presupuesto.
const domain = async (event:Event): Promise<{body:ISale[], statusCode:number}> => {
    const sales = await Sale.findAll({ 
        where: {
            state: event.queryStringParameters ,
            clientId : event.queryStringParameters,
            clientName: event.queryStringParameters,
        },
        attributes: { exclude: ['finished','deleted'] }
    });
    return {
        body: sales as ISale[],
        statusCode: 200
    }
}

export const Handler = (event:ApiGatewayParsedEvent)=>LambdaResolver(event, domain, [Validators.OFFSET_AND_LIMITS])