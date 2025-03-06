import { User } from 'models/User';
import { ApiGatewayParsedEvent } from 'types/response-factory/proxies';
import { Validators } from 'utils/Validator';
import { LambdaResolver } from 'utils/lambdaResolver';
interface Event extends ApiGatewayParsedEvent {
    pathParameters: {id: string}
}

const domain = async (event:Event): Promise<{body:number, statusCode:number}> => {
    const id = event.pathParameters.id;
    
    const user = await User.destroy({where: {id: id}});
    return {
        body: user,
        statusCode: 200
    }

}

export const Handler = (event:ApiGatewayParsedEvent)=>LambdaResolver(event, domain, [Validators.ID_USER])