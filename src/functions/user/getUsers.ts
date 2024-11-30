import { User , IUser } from 'models/User';
import { ApiGatewayParsedEvent } from 'types/response-factory/proxies';
import { Validators } from 'utils/Validator';
import { LambdaResolver } from 'utils/lambdaResolver';
interface Event extends ApiGatewayParsedEvent {
    queryStringParameters: {
        offset: string,
        limit: string
    }
}


const domain = async (event:Event): Promise<{body:IUser[], statusCode:number}> => {
    const {offset, limit} = event.queryStringParameters;
    const users = await User.findAll({
        offset: parseInt(offset), 
        limit: parseInt(limit),
        include: {
            model: User,
            as: 'rol',
            attributes: ['id', 'name', 'description']
        }
    });
    return {
        body: users as IUser[],
        statusCode: 200
    }    
}

export const Handler = (event:ApiGatewayParsedEvent)=>LambdaResolver(event, domain, [Validators.OFFSET_AND_LIMITS])