import { Log } from 'models/Log';
import { User } from 'models/User';
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
    let logs =  await Log.findAll();
    const user = await User.findAll();
    logs = logs.map(log=>({
        ...log.get({plain:true}),
        user: user.find(user=>user.id == log.get({plain:true}).userId)?.get({plain:true})
    }))
    return {body: logs, statusCode: 200}
}

export const Handler = (event:ApiGatewayParsedEvent)=>LambdaResolver(event, domain, [Validators.ADMIN_PERMISSION,Validators.VALID_JSON])