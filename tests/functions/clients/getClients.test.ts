import { Handler as getClient } from "functions/client/getClients";
import { mockEvent } from "types/response-factory/mocks";


describe('Test suit for getClients',()=>{
    const event ={
        ...mockEvent,
        headers:{
            entity: 'muebles'
        },
        queryStringParameters:{
            offset: '0',
            limit: '10'
        }
    }

    it('should return statusCode 200', async()=>{
        const response = await getClient(event)
        expect(response.statusCode).toBe(200);
    });
})