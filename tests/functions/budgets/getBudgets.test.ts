import { Handler as getSales } from "functions/sale/getSales";
import { mockEvent } from "types/response-factory/mocks";

describe('Test suit for getSale',()=>{
    const event ={
        ...mockEvent,
        headers:{
            Entity: 'muebles'
        }
    }
    it ('should return statusCode 200', async()=>{
        const response = await getSales(event)
        expect(response.statusCode).toBe(200);
    })
})
