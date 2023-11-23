import { Handler as getBudgets } from "functions/budgets/getBudgets";
import { mockEvent } from "types/response-factory/mocks";

describe('Test suit for getBudget',()=>{
    const event ={
        ...mockEvent,
        headers:{
            Entity: 'muebles'
        }
    }
    it ('should return statusCode 200', async()=>{
        const response = await getBudgets(event)
        expect(response.statusCode).toBe(200);
    })
})
