import { User , IUser } from 'models/User';
import { ApiGatewayParsedEvent } from 'types/response-factory/proxies';
import { Validators } from 'utils/Validator';
import { LambdaResolver } from 'utils/lambdaResolver';
interface Event extends ApiGatewayParsedEvent {
    body: IUser
}


const domain = async (event:Event): Promise<{body:number, statusCode:number}> => {
    const parsedBody = JSON.parse(event.body as unknown as string);
    const product = await User.create(parsedBody);
    return {
        body: product.id,
        statusCode: 200
    }    
}

export const Handler = (event:ApiGatewayParsedEvent)=>LambdaResolver(event, domain, [Validators.OFFSET_AND_LIMITS])