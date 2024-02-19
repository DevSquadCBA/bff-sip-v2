import { Client } from 'models/Client';
import { Sale, ISale } from 'models/Sale';
import { ApiGatewayParsedEvent } from 'types/response-factory/proxies';
import { Validators } from 'utils/Validator';
import { LambdaResolver } from 'utils/lambdaResolver';
interface Event extends ApiGatewayParsedEvent {
    pathParameters:{
        idSale:string
    },
}

const domain = async (event:Event): Promise<{body:ISale, statusCode:number}> => {
    const budget = await Sale.findByPk(event.pathParameters.idSale, {include: Client})
    
    return {
        body: budget as ISale,
        statusCode: 200
    }
}

export const Handler = (event:ApiGatewayParsedEvent)=>LambdaResolver(event, domain, [Validators.ID_SALE])