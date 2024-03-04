import { ApiGatewayParsedEvent } from  'types/response-factory/proxies';
import { LambdaResolver } from 'utils/lambdaResolver';

import {Faker, es} from '@faker-js/faker';
const faker = new Faker({locale: [es]});

import { Client, IClient } from 'models/Client';
import { InternalServerError } from 'types/errors';
import { IProduct, Product } from 'models/Product';

import sequelize from 'services/sequelize';
import { IProvider, Provider } from 'models/Provider';
import { ISale, Sale } from 'models/Sale';
import { EntityListValues, SalesStatesValues, StateProduct, StateProductValues } from 'models/Enums';
import { ISaleProduct, SaleProduct } from 'models/SaleProduct';

interface Event extends ApiGatewayParsedEvent {
    headers:{
        entity: string
        admin?: string
        Admin?: string
    }
}

function fakeClient():IClient{
    return {
        name: faker.person.fullName(),
        dni: faker.number.int({min: 10000000, max: 99999999}).toString(),
        email: faker.internet.email(),
        phone: '351' + faker.number.int({min:3,max:9}) + faker.number.int({min:100000,max:999999}).toString(),
        whatsapp: Math.random() > 0.5 ? '351' + faker.number.int({min:3,max:9}) + faker.number.int({min:100000,max:999999}).toString() : undefined,
        province: faker.location.state(),
        localidad: faker.location.city(),
        direction: faker.location.streetAddress(),
        deleted: false,
        fiscalCategory: faker.helpers.arrayElement(['responsable_inscripto','monotributista','consumidor_final'])
    }
}

function fakeProvider():IProvider{
    return {
        name: faker.company.name(),
        fantasyName: faker.company.name(),
        cuit_cuil: faker.number.int({min: 10000000, max: 99999999}),
        email: faker.internet.email(),
        province: faker.location.state(),
        locality: faker.location.city(),
        direction: faker.location.streetAddress(),
        phone: faker.number.int({min:3,max:9}) + faker.number.int({min:100000,max:999999}).toString(),
        voucherType: faker.helpers.arrayElement(['factura','boleta']),
        daysDelays: faker.number.int({min: 10, max: 60}),
        deleted: false
    }
}

function fakeProducts():IProduct{
    return {
        code: faker.number.int({min: 10000000, max: 99999999}),
        name: faker.commerce.productName(),
        salePrice: faker.number.float({min: 10, max: 1000, multipleOf: 0.01}),
        purchasePrice: faker.number.float({min: 10, max: 1000, multipleOf: 0.01}),
        providerId: faker.helpers.arrayElement(Array.from({length: 20}, (_, i) => i + 1)),
        stockeable: 1,
        negativeStock: 0,
        productType: 'simple', 
        img: '',
        daysDelay: faker.number.int({min: 10, max: 60}),
        deleted: false
    }
}

function fakeSales():ISale{
    const price = faker.number.float({min: 10, max: 1000, multipleOf: 0.01});
    return {
        clientId: faker.number.int({min: 1, max: 20}),
        state: faker.helpers.arrayElement(SalesStatesValues),
        total: faker.number.float({min: 10, max: 1000, multipleOf: 0.01}),
        paid: Math.random() > 0.5 ? price : Math.random() > 0.5 ? 0 : faker.number.float({min:0, max: price, multipleOf: 0.01}),
        budgetDetails: '',
        dispatch: 'without',
        seller: 'AstroDev',
        billing: 'AstroDev',
        deleted: false,
        entity: faker.helpers.arrayElement(EntityListValues)
    }
}

function fakeSaleProduct():ISaleProduct{
    const state = faker.helpers.arrayElement(StateProductValues)
    let details;
    if(state!== StateProduct.uninitiated){
        details = faker.lorem.lines({min: 1, max: 3})
    }
    return {
        saleId: faker.number.int({min: 1, max: 20}),
        productId: faker.number.int({min: 1, max: 20}),
        quantity: faker.number.int({min: 1, max: 20}),
        state,
        details
    }
}



async function fakeData(){
    const clients:IClient[] = faker.helpers.multiple(fakeClient, {count: 20});
    const providers:IProvider[] = faker.helpers.multiple(fakeProvider,{count:20});
    const products:IProduct[] = faker.helpers.multiple(fakeProducts, {count: 200});
    const sale:ISale[] = faker.helpers.multiple(fakeSales, {count: 20});
    const saleProduct:ISaleProduct[] = faker.helpers.multiple(fakeSaleProduct, {count: 60});

    await Client.bulkCreate(clients);
    await Provider.bulkCreate(providers);
    await Product.bulkCreate(products);
    await Sale.bulkCreate(sale);
    await SaleProduct.bulkCreate(saleProduct,{ignoreDuplicates:true});
}



const domain = async (event:Event): Promise<{body:string, statusCode:number}> => {
    const admin = event.headers.admin || event.headers['Admin'];
    if('astrodev'!= admin){
        return {
            body: 'not authorized',
            statusCode: 401
        }
    }
    if(event.queryStringParameters?.id && ['clients','products','providers','sales','saleProducts'].includes(event.queryStringParameters.id)){
        let count = 0;
        if(event.queryStringParameters?.count){
            count = parseInt(event.queryStringParameters.count);
        }
        switch(event.queryStringParameters.id){
            case 'clients':
                const clients:IClient[] = faker.helpers.multiple(fakeClient, {count: count || 20});
                await Client.bulkCreate(clients);
                break;
            case 'products':
                const products:IProduct[] = faker.helpers.multiple(fakeProducts, {count: count || 200});
                await Product.bulkCreate(products);
                break;
            case 'providers':
                const providers:IProvider[] = faker.helpers.multiple(fakeProvider,{count: count||20});
                await Provider.bulkCreate(providers);
                break;
            case 'sales':
                const sale:ISale[] = faker.helpers.multiple(fakeSales, {count: count || 20});
                await Sale.bulkCreate(sale);
                break;
            case 'saleProducts':
                const saleProduct:ISaleProduct[] = faker.helpers.multiple(fakeSaleProduct, {count: count || 60});
                await SaleProduct.bulkCreate(saleProduct,{ignoreDuplicates:true});
                break;
            default:
                break;
        }
        return {
            body: `generated ${count} ${event.queryStringParameters.id}`,
            statusCode: 200
        }
    }
    try{
        await sequelize.sync({alter:true, force:true});
        await fakeData();
    }catch(e){
        console.dir(e)
        throw new InternalServerError('algo se rompio en la consulta :c')
    }
    return {
        body: 'ok',
        statusCode: 200
    }    
}

export const Handler = (event:ApiGatewayParsedEvent)=>LambdaResolver(event, domain, [])