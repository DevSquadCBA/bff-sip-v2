import { Handler as getProviderById } from "functions/provider/getProviderById";
import { IProvider } from "models/Provider";
import { mockEvent } from "types/response-factory/mocks";
describe('This is the testsuit for getProviderById', ()=>{
    const event = {
        ...mockEvent,
        pathParameters: {
            idProvider: '1'
        },
        headers:{
            Entity: 'muebles'
        }
    }
    it('should return a valid Provider',async ()=>{
        process.env.expectedResponse = JSON.stringify([{name:'piatti', id:1}])
        const response = await getProviderById(event) as {body:IProvider, statusCode: number};
        expect(response.statusCode).toBe(200);
    })
    it('should return an error',async()=>{
        const eventModded = {
            ...event,
            pathParameters:{
                idProvider: ''
            }
        }
        const response = await getProviderById(eventModded) as {body:IProvider, statusCode: number};
        expect(response.statusCode).toBe(400);
    })
    it('should return an error',async()=>{
        const eventModded = {
            ...event,
            pathParameters:{
                idProvider: 'abc'
            }
        }
        const response = await getProviderById(eventModded) as {body:IProvider, statusCode: number};
        expect(response.statusCode).toBe(400);
    })
})