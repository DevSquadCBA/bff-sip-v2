import { Handler as getProvider } from "functions/provider/getProviders";
import { mockEvent } from "types/response-factory/mocks";
describe('Test suit for getCProviders',()=>{
    const event ={
        ...mockEvent,
        headers:{
            entity: 'muebles'
        }
    }

    it('should return statusCode 200', async()=>{
        const response = await getProvider(event)
        expect(response.statusCode).toBe(200);
    });
})