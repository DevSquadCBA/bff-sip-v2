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
import { SalesStatesValues, StateProductValues } from 'models/Enums';
import { ISaleProduct, SaleProduct } from 'models/SaleProduct';

interface Event extends ApiGatewayParsedEvent {
    headers:{
        Entity: string
        Admin: string
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
        fantasy_name: faker.company.name(),
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
        provider: faker.helpers.arrayElement(Array.from({length: 20}, (_, i) => i + 1)),
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
        paid: faker.number.float({min:0, max: price, multipleOf: 0.01}),
        budgetDetails: '',
        dispatch: 'without',
        seller: 'AstroDev',
        billing: 'AstroDev',
        deleted: false
    }
}

function fakeSaleProduct():ISaleProduct{
    return {
        saleId: faker.number.int({min: 1, max: 20}),
        productId: faker.number.int({min: 1, max: 20}),
        quantity: faker.number.int({min: 1, max: 20}),
        state: faker.helpers.arrayElement(StateProductValues)
    }
}



async function fakeData(){
    const clients:IClient[] = faker.helpers.multiple(fakeClient, {count: 20});
    const providers:IProvider[] = faker.helpers.multiple(fakeProvider,{count:20});
    const products:IProduct[] = faker.helpers.multiple(fakeProducts, {count: 20});
    const sale:ISale[] = faker.helpers.multiple(fakeSales, {count: 20});
    const saleProduct:ISaleProduct[] = faker.helpers.multiple(fakeSaleProduct, {count: 40});

    await Client.bulkCreate(clients);
    await Provider.bulkCreate(providers);
    await Product.bulkCreate(products);
    await Sale.bulkCreate(sale);
    await SaleProduct.bulkCreate(saleProduct,{ignoreDuplicates:true});
}



const domain = async (event:Event): Promise<{body:string, statusCode:number}> => {
    const admin = event.headers.Admin;
    if('astrodev'!= admin){
        return {
            body: 'not authorized',
            statusCode: 401
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