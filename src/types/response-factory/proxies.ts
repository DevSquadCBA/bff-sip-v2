import { APIGatewayProxyEvent, APIGatewayProxyEventPathParameters, APIGatewayProxyEventQueryStringParameters } from 'aws-lambda';
interface ApiGatewayParsedBody {
    [name: string]: any;
}
export interface ApiGatewayParsedEvent extends Omit<APIGatewayProxyEvent, 'body'> {
    body: ApiGatewayParsedBody |string;
    queryStringParameters: APIGatewayProxyEventQueryStringParameters;
    pathParameters: APIGatewayProxyEventPathParameters;
    headers:{
        Entity: string
    }
}
