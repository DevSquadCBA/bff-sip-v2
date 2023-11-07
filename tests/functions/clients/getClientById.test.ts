import { Handler as getClientById } from "functions/client/getClientById";
import { IClient } from "models/Client";
import { mockEvent } from "types/response-factory/mocks";
describe('This is the testsuit for getClientById', ()=>{
    const event = {
        ...mockEvent,
        pathParameters: {
            idClient: '1'
        },
        headers:{
            Entity: 'muebles'
        }
    }
    it('should return a valid Client',async ()=>{
        const response = await getClientById(event) as {body:IClient, statusCode: number};
        expect(response.statusCode).toBe(200);
    })
    it('should return an error',async()=>{
        const eventModded = {
            ...event,
            pathParameters:{
                idClient: ''
            }
        }
        const response = await getClientById(eventModded) as {body:IClient, statusCode: number};
        expect(response.statusCode).toBe(400);
    })
    it('should return an error',async()=>{
        const eventModded = {
            ...event,
            pathParameters:{
                idClient: 'abc'
            }
        }
        const response = await getClientById(eventModded) as {body:IClient, statusCode: number};
        expect(response.statusCode).toBe(400);
    })
})