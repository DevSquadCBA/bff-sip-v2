import { Handler as searchClient } from "functions/client/searchClient";
import { IClient } from "models/Client";
import { mockEvent } from "types/response-factory/mocks";
describe('This is the testsuit for getClientById', ()=>{
    const event = {
        ...mockEvent,
        queryStringParameters: {
            name: 'pepe'
        },
        headers:{
            entity: 'muebles'
        }
    }
    it('should return a valid Client',async ()=>{
        const response = await searchClient(event) as {body:IClient, statusCode: number};
        expect(response.statusCode).toBe(200);
    })
})