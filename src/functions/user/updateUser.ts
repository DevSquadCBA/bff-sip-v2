import { hash } from 'functions/utils/hash';
import { IUser, User } from 'models/User';
import { ApiGatewayParsedEvent } from 'types/response-factory/proxies';
import { Validators } from 'utils/Validator';
import { LambdaResolver } from 'utils/lambdaResolver';
interface Event extends ApiGatewayParsedEvent {
    pathParameters: {id: string}
    body: IUser
}

const domain = async (event:Event): Promise<{body:number, statusCode:number}> => {
    const id = event.pathParameters.id;
    const parsedBody = typeof event.body == 'string' ? JSON.parse(event.body as unknown as string): event.body;
    parsedBody.password = await hash(parsedBody.password);
    const user = await User.update(parsedBody, {where: {id: id}});
    return {
        body: user[0],
        statusCode: 200
    }

}

export const Handler = (event:ApiGatewayParsedEvent)=>LambdaResolver(event, domain, [Validators.ADMIN_PERMISSION,Validators.ID_USER, Validators.VALID_JSON])