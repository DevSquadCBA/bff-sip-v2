import {Product, IProduct } from 'models/Product';
import { Provider } from 'models/Provider';
import { Op,literal } from 'sequelize';
import { ApiGatewayParsedEvent } from 'types/response-factory/proxies';
import { Validators } from 'utils/Validator';
import { LambdaResolver } from 'utils/lambdaResolver';

interface Event extends ApiGatewayParsedEvent {}

const domain = async (event:Event): Promise<{body:IProduct[], statusCode:number}> => {
    const query =  event.queryStringParameters.query;
    if(!query){return {body: [], statusCode: 200}};
    const words = query?.split(' ');
    const products = await Product.findAll({
        include: {
            model: Provider,
            as: 'provider',
            attributes: { exclude: ['deleted'] }
        },
        where: {
            [Op.or]: [
                {name:{[Op.or]:[...words.map(w=>({[Op.like]:`%${w}%`}))]}},
                {code:{[Op.or]:[...words.map(w=>({[Op.like]:`%${w}%`}))]}},
                literal(`provider.name like ${words.map(w=>(`'%${w}%'`) ).join(' or ')} or provider.fantasyName like ${words.map(w=>(`'%${w}%'`) ).join(' or ')}`),
            ]
        },
        attributes: { exclude: ['deleted'] }
    });
    console.log(products);
    return {
        body: products as IProduct[],
        statusCode: 200
    }
}

export const Handler = (event:ApiGatewayParsedEvent)=>LambdaResolver(event, domain, [Validators.QUERY])