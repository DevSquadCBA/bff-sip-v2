import { Handler as updateClient } from "functions/client/updateClient";
import { IClient } from "models/Client";
import { mockEvent } from "types/response-factory/mocks";
describe('This is the testsuit for getClientById', ()=>{
    const event = {
        ...mockEvent,
        pathParameters: {
            idClient: '1'
        },
        headers:{
            entity: 'muebles'
        },
        body: JSON.stringify({name: 'pepe'})
    }
    it('should return a valid Client',async ()=>{
        const response = await updateClient(event) as {body:IClient, statusCode: number};
        expect(response.statusCode).toBe(200);
    })
})