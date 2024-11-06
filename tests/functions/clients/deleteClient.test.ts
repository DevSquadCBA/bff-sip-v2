import { Handler as getClient } from "functions/client/deleteClient";
import { mockEvent } from "types/response-factory/mocks";


describe('Test suit for getClients',()=>{
    const event ={
        ...mockEvent,
        headers:{
            entity: 'muebles'
        },
       pathParameters: {
            id: '1'
        }
    }

    it('should return statusCode 200', async()=>{
        const response = await getClient(event)
        expect(response.statusCode).toBe(200);
    });
    it('should return error on delete', async()=>{
        const eventModded = {
            ...event,
            pathParameters:{
                id: '42'
            }
        }
        const response = await getClient(eventModded)
        expect(response.statusCode).toBe(400);
    })
})