import { Handler as getProducts } from "functions/product/getProducts";
import { mockEvent } from "types/response-factory/mocks";

describe('Test suit for getProduct',()=>{
    const event ={
        ...mockEvent,
        headers:{
            entity: 'muebles'
        },
        queryStringParameters: {
            limit: '0',
            offset: '0'
        },
    }

    it('should return statusCode 200', async()=>{
        const response = await getProducts(event)
        expect(response.statusCode).toBe(200);
    });
})