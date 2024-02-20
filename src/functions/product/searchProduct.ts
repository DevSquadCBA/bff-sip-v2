import {Product, IProduct } from 'models/Product';
import { Provider } from 'models/Provider';
import { Op,literal } from 'sequelize';
import { ApiGatewayParsedEvent } from 'types/response-factory/proxies';
import { Validators } from 'utils/Validator';
import { LambdaResolver } from 'utils/lambdaResolver';

interface Event extends ApiGatewayParsedEvent {}

const domain = async (event:Event): Promise<{body:IProduct[], statusCode:number}> => {
    const query =  event.queryStringParameters.query;
    const products = await Product.findAll({
        include: {
            model: Provider,
            as: 'provider',
            attributes: { exclude: ['deleted'] }
        },
        where: {
            [Op.or]: [
                {name:{[Op.like]: '%'+query+'%'}},
                {code: {[Op.like]: '%'+query+'%'}},
                literal(`provider.name like '%${query}%'`)
            ]
        },
        attributes: { exclude: ['deleted'] }
    });
    return {
        body: products as IProduct[],
        statusCode: 200
    }
}

export const Handler = (event:ApiGatewayParsedEvent)=>LambdaResolver(event, domain, [Validators.QUERY])