import { Handler as searchProduct } from "functions/product/searchProduct";
import { IClient } from "models/Client";
import { mockEvent } from "types/response-factory/mocks";
describe('This is the testsuit for getClientById', ()=>{
    const event = {
        ...mockEvent,
        headers:{
            entity: 'muebles'
        },
        queryStringParameters: {
            query: 'pepe'
        }
    }
    it('should return a valid Product',async ()=>{
        const response = await searchProduct(event) as {body:IClient, statusCode: number};
        expect(response.statusCode).toBe(200);
    })
    it('should return an empty body if query is empty',async ()=>{
        const eventModded = {
            ...event,
            queryStringParameters:{
                query: ''
            }
        }
        const response = await searchProduct(eventModded) as {body:IClient, statusCode: number};    
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual("[]");  
    })
})