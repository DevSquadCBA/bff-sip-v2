import { Handler as getClient } from "functions/client/getClients";
import { mockEvent } from "types/response-factory/mocks";
describe('Test suit for getClients',()=>{
    const event ={
        ...mockEvent,
        headers:{
            Entity: 'muebles'
        }
    }

    it('should return statusCode 200', async()=>{
        const response = await getClient(event)
        expect(response.statusCode).toBe(200);
    });
})