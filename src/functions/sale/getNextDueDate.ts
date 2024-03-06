import { ApiGatewayParsedEvent } from 'types/response-factory/proxies';
import { Validators } from 'utils/Validator';
import { LambdaResolver } from 'utils/lambdaResolver';
import { SaleStates as SS } from 'models/Enums';
import { Op } from 'sequelize';
import { Sale } from 'models/Sale';
import dayjs from 'dayjs';
interface Event extends ApiGatewayParsedEvent {
    pathParameters: {
        idClient: string
    }
}
type DueDate = {
    dueDate: Date,
    daysToDueDate: number,
    idSale: number
}


const domain = async (event:Event): Promise<{body:{dueDate:DueDate} | null, statusCode:number}> => {
    const nextSale = await Sale.findOne({
            where: {
                clientId: event.pathParameters.idClient,
                state: {
                    [Op.not]: [SS.presupuesto, SS.proforma, SS.canceled, SS.finished]
                }
            }, order: [['updatedAt', 'ASC']]
        });
    if(!nextSale){
        return {
            body: null,
            statusCode: 200
        }
    }
    const daysToDueDate = dayjs(nextSale.updatedAt).diff(dayjs(), 'day');
    return {
        body: {
            dueDate: {
                dueDate: nextSale.updatedAt,
                daysToDueDate,
                idSale: nextSale.id
            }
        },
        statusCode: 200
    }
}

export const Handler = (event:ApiGatewayParsedEvent)=>LambdaResolver(event, domain, [Validators.ID_CLIENT])