import { Handler as getProductById } from "functions/product/getProductById";
import { IClient } from "models/Client";
import { mockEvent } from "types/response-factory/mocks";
describe('This is the testsuit for getClientById', ()=>{
    const event = {
        ...mockEvent,
        headers:{
            entity: 'muebles'
        },
        pathParameters: {
            idProduct: '1'
        },
    }
    it('should return a valid Client',async ()=>{
        const response = await getProductById(event) as {body:IClient, statusCode: number};
        expect(response.statusCode).toBe(200);
    })
})