import { Handler as updateProduct } from "functions/product/updateProduct";
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
        body: JSON.stringify({name: 'pepe'})
    }
    it('should update a product successfully',async ()=>{
        const response = await updateProduct(event) as {body:IClient, statusCode: number};
        expect(response.statusCode).toBe(200);
    })
})