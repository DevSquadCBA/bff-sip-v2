import { Handler as getProductById } from "functions/product/getProductById";
import { IProduct } from "models/Product";
import { mockEvent } from "types/response-factory/mocks";

describe('This is the testsuit for getProductById', ()=>{
    const event = { 
        ...mockEvent,
        pathParameters: {
            idProduct: '1'
        },
        headers:{
            Entity: 'puertas'
        }
    }
    it('should return a valid Product',async ()=>{
        process.env.expectedResponse = JSON.stringify([{name:'puerta', id:1}])
        const response = await getProductById(event) as {body:IProduct, statusCode: number};
        expect(response.statusCode).toBe(200);
    })
    it('should return an error',async()=>{
        const eventModded = {
            ...event,
            pathParameters:{
                idProduct: ''
            }
        }
        const response = await getProductById(eventModded) as {body:IProduct, statusCode: number};
        expect(response.statusCode).toBe(400);
    })
    it('should return an error',async()=>{
        const eventModded = {
            ...event,
            pathParameters:{
                idProduct: 'abc'
            }
        }
        const response = await getProductById(eventModded) as {body:IProduct, statusCode: number};
        expect(response.statusCode).toBe(400);
    })
})