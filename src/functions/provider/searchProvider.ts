import {Provider, IProvider } from 'models/Provider';
import { Op } from 'sequelize';
import { ApiGatewayParsedEvent } from 'types/response-factory/proxies';
import { Validators } from 'utils/Validator';
import { LambdaResolver } from 'utils/lambdaResolver';

interface Event extends ApiGatewayParsedEvent {
    queryStringParameters: {
        query:string
    }
}

const domain = async (event:Event): Promise<{body:IProvider[], statusCode:number}> => {
    const query = event.queryStringParameters.query;
    const providers = await Provider.findAll({ 
        where: {
            [Op.or]:{
                name: {[Op.like]: '%'+query+'%'},
                fantasyName: {[Op.like]: '%'+query+'%'},
                cuit_cuil: {[Op.like]: '%'+query+'%'}
            }
        },
        attributes: { exclude: ['deleted'] }
    });
    return {
        body: providers as IProvider[],
        statusCode: 200
    }
}

export const Handler = (event:ApiGatewayParsedEvent)=>LambdaResolver(event, domain, [Validators.QUERY])