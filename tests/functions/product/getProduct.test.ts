import { Handler as getProduct } from "functions/product/getProduct";
import { mockEvent } from "types/response-factory/mocks";

describe('Test suit for getProduct',()=>{
    const event ={
        ...mockEvent,
        headers:{
            Entity: 'muebles'
        }
    }

    it('should return statusCode 200', async()=>{
        const response = await getProduct(event)
        expect(response.statusCode).toBe(200);
    });
})