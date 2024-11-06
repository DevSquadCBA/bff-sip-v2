import { Handler as getSales } from "functions/sale/getSales";
import { mockEvent } from "types/response-factory/mocks";
jest.mock('models/Sale', () => ({
    ...jest.requireActual('models/Sale'),
    Sale:{
        findAll: jest.fn().mockImplementation(() => {
            console.log('here');
            return Promise.resolve([])
        })
    }
}))
jest.mock('models/Product', () => ({
    Product:{
        findAll: jest.fn().mockImplementation(() => {
            
        })     
    }
}))


describe('Test suit for getSale',()=>{
    const event ={
        ...mockEvent,
        headers:{
            entity: 'muebles'
        }
    }
    it ('should return statusCode 200', async()=>{
        const response = await getSales(event)
        expect(response.statusCode).toBe(200);
    })
})
