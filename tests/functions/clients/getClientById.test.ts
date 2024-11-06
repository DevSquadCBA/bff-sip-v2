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
            entity: 'muebles'
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
        expect(response.statusCode).toBe(404);
    })
    it('should return an error',async()=>{
        const eventModded = {
            ...event,
            pathParameters:{
                idClient: 'abc'
            }
        }
        const response = await getClientById(eventModded) as {body:IClient, statusCode: number};
        expect(response.statusCode).toBe(404);
    })
    it('should return body null and statusCode 404',async()=>{
        const eventModded = {
            ...event,
            pathParameters:{
                idClient: '42'
            }
        }
        const response = await getClientById(eventModded) as {body:IClient, statusCode: number};
        expect(response.statusCode).toBe(404);
    })

})