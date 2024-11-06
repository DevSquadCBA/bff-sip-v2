import { Handler as createProduct } from "functions/product/createProduct";
import { IClient } from "models/Client";
import { mockEvent } from "types/response-factory/mocks";
describe('This is the testsuit for getClientById', ()=>{
    const event = {
        ...mockEvent,
        headers:{
            entity: 'muebles'
        },
        body: JSON.stringify({name: 'pepe'})
    }
    it('should return a valid Client',async ()=>{
        const response = await createProduct(event) as {body:IClient, statusCode: number};
        expect(response.statusCode).toBe(200);
    })
})