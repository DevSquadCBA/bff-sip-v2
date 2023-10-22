import { APIGatewayProxyEvent, APIGatewayProxyEventPathParameters, APIGatewayProxyEventQueryStringParameters } from 'aws-lambda';
interface ApiGatewayParsedBody {
    [name: string]: any;
}
export interface ApiGatewayParsedEvent extends Omit<APIGatewayProxyEvent, 'body'> {
    body: ApiGatewayParsedBody;
    queryStringParameters: APIGatewayProxyEventQueryStringParameters;
    pathParameters: APIGatewayProxyEventPathParameters;
}
