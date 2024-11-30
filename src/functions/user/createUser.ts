import { hash } from 'functions/utils/hash';
import { User } from 'models/User';
import { ApiGatewayParsedEvent } from 'types/response-factory/proxies';
import { Validators } from 'utils/Validator';
import { LambdaResolver } from 'utils/lambdaResolver';

interface Event extends ApiGatewayParsedEvent{
    body:User
}

const domain = async(event: Event): Promise<{body:number, statusCode:number}> => {
    const userRaw = event.body;
    userRaw.password = await hash(userRaw.password);
    console.log(userRaw)
    const user = await User.create(userRaw);
    return {
        body: user.id,
        statusCode: 200
    }
}
export const Handler = (event:ApiGatewayParsedEvent)=>LambdaResolver(event, domain, [Validators.ADMIN_PERMISSION,Validators.VALID_USER])