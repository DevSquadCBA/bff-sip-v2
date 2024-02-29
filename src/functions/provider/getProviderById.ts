import { Provider, IProvider } from 'models/Provider';
import { ApiGatewayParsedEvent } from 'types/response-factory/proxies';
import { Validators } from 'utils/Validator';
import { LambdaResolver } from 'utils/lambdaResolver';
interface Event extends ApiGatewayParsedEvent {
    pathParameters:{
        idProvider:string
    },
}

const domain = async (event:Event): Promise<{body:IProvider, statusCode:number}> => {
    const provider = await Provider.findByPk(event.pathParameters.idProvider)
    return {
        body: provider as IProvider,
        statusCode: 200
    }
}

export const Handler = (event:ApiGatewayParsedEvent)=>LambdaResolver(event, domain, [Validators.ID_PROVIDER])