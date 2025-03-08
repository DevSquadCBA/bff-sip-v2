import 'aws-sdk-client-mock-jest';
import * as iconv from 'iconv-lite';
import { HTTPError} from 'types/errors';
iconv.encodingExists('foo');

process.env.DEBUG = 'true';
process.env.NODE_ENV = 'test';
process.env.HOST = "192.168.1.32",
process.env.USER = "root",
process.env.PASS = "1234",
process.env.DB = "piatti",
process.env.DEBUG = "true"

const sale ={
    id: 1,
    clientId: 1,
    state: 'finished',
    total: 0,
    creationDate: new Date(),
    updateDate: new Date(),
    get: () => sale
}

const mockedClient=  {
    id: 1,
    name: 'test',
    fantasyName: 'test',
    fiscalCategory: 'responsable_inscripto',
    dni: '12345678',
    email: 'test',
    phone: 'test',
    whatsapp: 'test',
    province: 'test',
    localidad: 'test',
    address: 'test',
    deleted: false,
    sales: [sale],
    get: () => mockedClient,
}
const mockProduct = {
    id: 1,
    name: 'test',
    price: 100.00
}

jest.mock('utils/LambdaResolver', () => ({
    LambdaResolver: jest.fn().mockImplementation(async (event,domain) => {
        let response;
        try{
            response = await domain(event);
        }catch(error){
            if(error instanceof HTTPError){
                console.error(error.message);
                response ={
                    body: error,
                    statusCode: error.statusCode,
                };
            }else{
                response = {
                    body: {
                        message: 'Error inesperado del servidor',
                        statusCode: 0,
                    },
                    statusCode: 500
                }
            }
        }
        return responseFactory(response);
    })
}))

jest.mock('models/Client', () => ({
    ...jest.requireActual('models/Client'),
    Client:{
        findAll: jest.fn().mockImplementation(() => {
            return Promise.resolve([mockedClient])
        }),
        create: jest.fn().mockImplementation(() => {
            return Promise.resolve(mockedClient);
        }),
        update: jest.fn().mockImplementation((fields,wherecondition) => {
            const {where:{id}} = wherecondition;
            if(id==1){
                return Promise.resolve(mockedClient);
            }else{
                return Promise.reject('error');
            }
        }),
        findByPk: jest.fn().mockImplementation((idClient) => {
            if(idClient==1){
                return Promise.resolve(mockedClient);
            }else{
                return Promise.resolve(null);
            }
        }),
        getClientsWithSaleInfo: jest.fn().mockImplementation(() => {
            return Promise.resolve([mockedClient]);
        })
    }
}))

jest.mock('models/ClientSale', () => ({
    ...jest.requireActual('models/ClientSale'),
    ClientSale:{
        findAll: jest.fn().mockImplementation(() => {
            return Promise.resolve([
                {
                    saleId: 1,
                    clientId: 1,
                    state: 'active',
                    total: 100.00,
                    paid: 50.00,
                    deleted: false
                }
            ]);
        }),
        create: jest.fn().mockImplementation(() => {
            return Promise.resolve({
                id: 1,
                saleId: 1,
                clientId: 1,
                state: 'active',
                total: 100.00,
                paid: 50.00,
                deleted: false
            });
        })
    }
}))

jest.mock('models/Product', () => ({
    ...jest.requireActual('models/Product'),
    Product:{
        findAll: jest.fn().mockImplementation(() => {
            return Promise.resolve([mockProduct]);
        }),
        create: jest.fn().mockImplementation(() => {
            return Promise.resolve(mockProduct);
        }),
        update: jest.fn().mockImplementation((fields,wherecondition) => {
            const {where:{id}} = wherecondition;
            if(id==1){
                return Promise.resolve(mockProduct);
            }else{
                return Promise.reject(mockProduct);
            }
        }),
        findByPk: jest.fn().mockImplementation(() => {
            return Promise.resolve(mockProduct);
        })
    }
}))

function responseFactory({body, statusCode}: {body:unknown, statusCode: number}): any {
    return {
        statusCode, 
        headers:{
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body), 
        isBase64Encoded: false
    }
}
