import { Handler as getProductWithProvider } from "functions/product/getProductWithProvider";
import { IClient } from "models/Client";
import { mockEvent } from "types/response-factory/mocks";
describe('This is the testsuit for getClientById', ()=>{
    const event = {
        ...mockEvent,
        headers:{
            entity: 'muebles'
        },
        queryStringParameters: {
            limit: '0',
            offset: '0'
        },
    }
    it('should return a valid Client',async ()=>{
        const response = await getProductWithProvider(event) as {body:IClient, statusCode: number};
        expect(response.statusCode).toBe(200);
    })
})