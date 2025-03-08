import { Handler as deleteProduct } from "functions/product/deleteProduct";
import { IClient } from "models/Client";
import { mockEvent } from "types/response-factory/mocks";
describe('This is the testsuit for getClientById', ()=>{
    const event = {
        ...mockEvent,
        headers:{
            entity: 'muebles'
        },
        pathParameters: {
            id: '1'
        },
        body: JSON.stringify({name: 'pepe'})
    }
    it('should return a valid Client',async ()=>{
        const response = await deleteProduct(event) as {body:IClient, statusCode: number};
        expect(response.statusCode).toBe(200);
    })
    it('should return an error',async()=>{
        const eventModded = {
            ...event,
            pathParameters:{
                idProduct: '42'
            }
        }
        const response = await deleteProduct(eventModded) as {body:IClient, statusCode: number};
        expect(response.statusCode).toBe(400);    
    })
})