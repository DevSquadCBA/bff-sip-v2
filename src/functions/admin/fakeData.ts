import { ApiGatewayParsedEvent } from  'types/response-factory/proxies';
import { LambdaResolver } from 'utils/lambdaResolver';

import {Faker, es} from '@faker-js/faker';
const faker = new Faker({locale: [es]});

import { Client, IClient } from 'models/Client';
import { InternalServerError } from 'types/errors';
import { IProduct, Product } from 'models/Product';

import sequelize from 'services/sequelize';
import { IProvider, Provider } from 'models/Provider';
import { ISale, Sale, SaleComplete } from 'models/Sale';
import { EntityList,  SalesStatesValues, StateProduct, StateProductValues } from 'models/Enums';
import { ISaleProduct, SaleProduct } from 'models/SaleProduct';
import dayjs from 'dayjs';
import { User } from 'models/User';
import { Rol } from 'models/Rol';
import { recalculateTotal } from 'utils/utils';

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
        address: faker.location.streetAddress(),
        deleted: false,
        fiscalCategory: faker.helpers.arrayElement(['Consumidor Final', 'Monotributista', 'Responsable Inscripto', 'Exento', 'No categorizado'])
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
        address: faker.location.streetAddress(),
        phone: faker.number.int({min:3,max:9}) + faker.number.int({min:100000,max:999999}).toString(),
        voucherType: faker.helpers.arrayElement(['factura','boleta']),
        daysDelays: faker.number.int({min: 10, max: 60}),
        deleted: false
    }
}

function fakeProducts():IProduct{
    const purchasePrice = faker.number.float({min: 10, max: 1000, multipleOf: 0.01});
    return {
        code: faker.number.int({min: 10000000, max: 99999999}),
        name: faker.commerce.productName(),
        salePrice: faker.number.float({min: purchasePrice, max: purchasePrice + 500, multipleOf: 0.01}),
        purchasePrice,
        providerId: faker.helpers.arrayElement(Array.from({length: 20}, (_, i) => i + 1)),
        //stockeable: 1,
        //negativeStock: 0,
        productType: 'simple', 
        img: '',
        //daysDelay: faker.number.int({min: 10, max: 60}),
        deleted: false
    }
}

function fakeSales():ISale{
    const price = faker.number.float({min: 10, max: 1000, multipleOf: 0.01});
    const estimatedDays = faker.number.int({min: 10, max: 60});
    const state = faker.helpers.arrayElement(SalesStatesValues);
    const createdAt = faker.date.between({from:'2024-01-01',to:dayjs().format('YYYY-MM-DD')});
    const updatedAt = createdAt;
    const deadline = !['proforma', 'presupuesto'].includes(state)? dayjs(createdAt).add(estimatedDays, 'day').toDate(): null;
    // create 3 sale for each type of state for each type of client
    return {
        clientId: faker.number.int({min: 1, max: 10}),
        state,
        total: faker.number.float({min: 10, max: 1000, multipleOf: 0.01}),
        paid: Math.random() > 0.5 ? price : Math.random() > 0.5 ? 0 : faker.number.float({min:0, max: price, multipleOf: 0.01}),
        budgetDetails: '',
        dispatch: 'without',
        seller: 'AstroDev',
        billing: 'AstroDev',
        deleted: false,
        estimatedDays,
        deadline,
        entity: EntityList.muebles, //' #faker.helpers.arrayElement(EntityListValues)
        createdAt: createdAt.toString(), 
        updatedAt: updatedAt.toString()
    }
}

function fakeSaleProduct(fakeProducts:IProduct[], sales:ISale[]):ISaleProduct{
    const state = faker.helpers.arrayElement(StateProductValues)
    let details;
    if(state!== StateProduct.uninitiated){
        if(Math.random()<0.5){
            details = faker.commerce.productMaterial()
        }else{
            details = '';
        }
    }
    const randomProduct = faker.helpers.arrayElement(fakeProducts);
    const price = randomProduct.salePrice
    const discount = Math.random() > 0.92 ? faker.number.float({min: 0.5, max: 0.9, multipleOf: 0.1}) : 0
    const quantity =faker.number.int({min: 1, max: 20});
    return {
        saleId: faker.number.int({min: 1, max: sales[0].id}),
        productId: randomProduct.id as number,  //faker.number.int({min: 1, max: 200}),
        quantity ,
        price: (price * quantity) * (discount || 1),
        discount,
        state,
        details
    }
}

async function fakeData(){
    const clients:IClient[] = faker.helpers.multiple(fakeClient, {count: 10});
    const providers:IProvider[] = faker.helpers.multiple(fakeProvider,{count:20});
    const products:IProduct[] = faker.helpers.multiple(fakeProducts, {count: 300});
    const sale:ISale[] = faker.helpers.multiple(fakeSales, {count: 40});
    
    await Client.bulkCreate(clients);
    await Provider.bulkCreate(providers);
    await Product.bulkCreate(products);
    await Sale.bulkCreate(sale);
    const realSales = await Sale.findAll({order: [['id', 'DESC']]});
    const realProducts = await Product.findAll({where: {deleted: false}});
    const saleProduct:ISaleProduct[] = faker.helpers.multiple(()=>fakeSaleProduct(realProducts, realSales), {count: 100});
    await SaleProduct.bulkCreate(saleProduct,{ignoreDuplicates:true});
    await Rol.create({id:1,name:'Administrador',description:'Administrador'})
    await Rol.create({id:2,name:'Supervisor',description:'Supervisor'})
    await Rol.create({id:3,name:'Vendedor',description:'Vendedor'})
    await User.create({
            name: 'Maria Eugenia Díaz Segura',
            email: 'bujes',
            phone:'1',
            password: '$2a$12$CTlcYkAN3eM2tb.2u08sM.o.6pGaSxweFQbe7yBAickd3KYS1JM6S', // .
            roleId:1
        } as User
    );
    await User.create({
        name: 'Leandro Ezequiel Ferrarotti Blasco',
        email: 'lean',
        phone:'1',
        password: '$2a$12$CTlcYkAN3eM2tb.2u08sM.o.6pGaSxweFQbe7yBAickd3KYS1JM6S', // .
        roleId:2
    } as User
    );
    await User.create({
        name: 'Mono D Luffy',
        email: 'vendor',
        phone:'1',
        password: '$2a$12$CTlcYkAN3eM2tb.2u08sM.o.6pGaSxweFQbe7yBAickd3KYS1JM6S', // .
        roleId:3
    } as User
    );
    recalculateSales(await Sale.findAll({where: {deleted: false},include:[{model: Product, as: 'products'}]}));
}

async function recalculateSales(sales:SaleComplete[]){
    // recalculate the sales price
    for (let i = 0; i < sales.length; i++) {
        const sale = sales[i].get({plain: true});
        let total = 0;
        sale.products = sale.products.map(e=>({...e, saleProduct: e.SaleProduct? e.SaleProduct: e.saleProduct}));
        console.log({products: sale.products});
        const hasDiscount = sale.products.some((p:any)=>p.saleProduct.discount && p.saleProduct.discount>0);        
        total = hasDiscount
            ? sale.products.reduce((acc: number, product: any) => {
                    console.log({product,hasDiscount});
                    const totalProduct = (parseFloat(product.saleProduct.price) * parseFloat(product.saleProduct.quantity)) * parseFloat(product.saleProduct.discount);
                    return acc + Math.round(totalProduct)
                }, 0)
            : sale.products.reduce((acc, product) => acc + product.saleProduct.price * (product.saleProduct.quantity), 0);
        total = Math.round(total);
        await Sale.update({total: total}, {where: {id: sale.id}});
    }
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
                await recalculateSales(await Sale.findAll({where: {deleted: false}}))
                break;
            case 'saleProducts':
                const realSales = await Sale.findAll({order: [['id', 'DESC']]});
                const productsForSale:IProduct[] = await Product.findAll();
                const saleProduct:ISaleProduct[] = faker.helpers.multiple(()=>fakeSaleProduct(productsForSale, realSales), {count: count || 60});
                await SaleProduct.bulkCreate(saleProduct,{ignoreDuplicates:true});
                recalculateSales(await Sale.findAll({where: {deleted: false},include:[{model: Product, as: 'products'}]}));
                break;
            default:
                break;
        }
        return {
            body: `generated ${count} ${event.queryStringParameters.id}`,
            statusCode: 200
        }
    }

    if(event.queryStringParameters?.recalculate){
        try{
            await recalculateSales(await Sale.findAll({
                    where:{
                        deleted: false,
                        entity: 'muebles'
                    },
                    include: [
                        {model: Client,attributes: { exclude: ['deleted'] }},
                        {model: Product,
                            attributes: { exclude: ['deleted']},
                            as: 'products', 
                            through: {
                                attributes: { exclude: ['deleted', 'saleId', 'productId'] }, as: 'saleProduct'},
                                include: [{model: Provider, as: 'provider'}]
                            },
                    ],
                }) as unknown as SaleComplete[]);
            return {
                body: 'ok',
                statusCode: 200
            }
        }catch(e){
            console.dir(e)
            throw new InternalServerError('algo se rompio en la consulta :c')
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