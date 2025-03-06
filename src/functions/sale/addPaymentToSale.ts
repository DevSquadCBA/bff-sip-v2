import { ISale, Sale } from "models/Sale"
import { ApiGatewayParsedEvent } from "types/response-factory/proxies"
import { LambdaResolver } from "utils/lambdaResolver"
import { Validators } from "utils/Validator"

interface Event extends ApiGatewayParsedEvent {
    pathParameters: {
        idSale: string
    },
    body: string
}

const domain = async (event:Event): Promise<{body:ISale, statusCode:number}> => {
    const idSale = event.pathParameters.idSale;
    const {paid} = typeof event.body === 'string'? JSON.parse(event.body) : event.body;
    const sale =  await Sale.findByPk(idSale);
    if(!sale){throw new Error('sale not found');}

    const totalPaid = parseInt(sale?.paid.toString()|| '') + parseInt(paid);
    
    // si paid es mayor a total, arroja error
    if(totalPaid> sale?.total){throw new Error('paid is greater than total');}
    
    if(!paid){throw new Error('paid is required');}
    if(!idSale){throw new Error('idSale is required');}
    await Sale.update({paid: totalPaid}, {where: {id: idSale}});
    const saleToReturn = sale?.get({plain: true}) as ISale;
    saleToReturn.paid = totalPaid;
    return {
        body: saleToReturn,
        statusCode: 200
    }
}

export const Handler = (event:ApiGatewayParsedEvent)=>LambdaResolver(event, domain, [Validators.ID_SALE, Validators.VALID_JSON])