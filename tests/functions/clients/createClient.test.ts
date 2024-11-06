import { Handler as getClient } from "functions/client/createClient";
import { mockEvent } from "types/response-factory/mocks";


describe('Test suit for getClients',()=>{
    const event ={
        ...mockEvent,
        headers:{
            entity: 'muebles'
        },
       body: JSON.stringify({name: 'pepe'})
    }

    it('should return statusCode 200', async()=>{
        const response = await getClient(event)
        expect(response.statusCode).toBe(200);
    });
})