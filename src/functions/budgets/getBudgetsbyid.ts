import { Budget, IBudget } from 'models/Budget';
import { ApiGatewayParsedEvent } from 'types/response-factory/proxies';
import { Validators } from 'utils/Validator';
import { LambdaResolver } from 'utils/lambdaResolver';
interface Event extends ApiGatewayParsedEvent {
    pathParameters:{
        idBudget:string
    },
}

const domain = async (event:Event): Promise<{body:IBudget, statusCode:number}> => {
    const budget = await Budget.findByPk(event.pathParameters.idBudget)
    return {
        body: budget as IBudget,
        statusCode: 200
    }
}

export const Handler = (event:ApiGatewayParsedEvent)=>LambdaResolver(event, domain, [Validators.ID_BUDGET])