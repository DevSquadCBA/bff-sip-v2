import {Budget , IBudget } from 'models/Budget';
import { ApiGatewayParsedEvent } from 'types/response-factory/proxies';
import { Validators } from 'utils/Validator';
import { LambdaResolver } from 'utils/lambdaResolver';
interface Event extends ApiGatewayParsedEvent {
    body: IBudget
}

const domain = async (event:Event): Promise<{body:number, statusCode:number}> => {
    const parsedBody = JSON.parse(event.body as unknown as string);
    console.log(parsedBody);
    const budget = await Budget.update(parsedBody, {where: {id: parsedBody.id}});
    return {
        body: budget[0],
        statusCode: 200
    }

}

export const Handler = (event:ApiGatewayParsedEvent)=>LambdaResolver(event, domain, [Validators.OFFSET_AND_LIMITS])