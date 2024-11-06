import { Handler as getClientList } from "functions/client/getClientsList";
import { IClient } from "models/Client";
import { mockEvent } from "types/response-factory/mocks";
describe('This is the testsuit for getClientById', ()=>{
    const event = {
        ...mockEvent,
        queryStringParameters: {
            offset: '0',
            limit: '10'
        },
        headers:{
            entity: 'muebles'
        }
    }
    it('should return a valid Client',async ()=>{
        const response = await getClientList(event) as {body:IClient, statusCode: number};
        expect(response.statusCode).toBe(200);
    })
})