import { Log } from 'models/Log';
import { ApiGatewayParsedEvent } from 'types/response-factory/proxies';
import { Validators } from 'utils/Validator';
import { LambdaResolver } from 'utils/lambdaResolver';
interface Event extends ApiGatewayParsedEvent {
    queryStringParameters: {
        offset: string,
        limit: string
    }
}

const domain = async (event:Event): Promise<{body:Log[], statusCode:number}> => {
    const logs =  await Log.findAll()
    return {body: logs, statusCode: 200}
}

export const Handler = (event:ApiGatewayParsedEvent)=>LambdaResolver(event, domain, [Validators.ADMIN_PERMISSION,Validators.VALID_JSON])