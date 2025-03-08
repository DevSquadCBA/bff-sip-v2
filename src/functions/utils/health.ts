import { ApiGatewayParsedEvent } from "types/response-factory/proxies";
type lambdaResponse = {
    statusCode: number,
    headers: {
        "Access-Control-Allow-Origin": string,
        "Content-Type": string
    }, 
    body: unknown
    isBase64Encoded: boolean
}

export async function Handler(event:ApiGatewayParsedEvent):Promise<lambdaResponse> {
    return responseFactory({body: 'OK', statusCode: 200})
}
function responseFactory({body, statusCode}: {body:unknown, statusCode: number}){
    return {
        statusCode, 
        headers:{
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body), 
        isBase64Encoded: false
    }
}
