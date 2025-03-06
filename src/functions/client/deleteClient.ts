import { Client } from 'models/Client';
import { ErrorOnDelete } from 'types/errors';
import { ApiGatewayParsedEvent } from 'types/response-factory/proxies';
import { Validators } from 'utils/Validator';
import { LambdaResolver } from 'utils/lambdaResolver';

interface Event extends ApiGatewayParsedEvent {
    pathParameters: {
        idClient: string;
    };
}

const domain = async (event: Event): Promise<{ body: string; statusCode: number }> => {
    const { idClient } = event.pathParameters;

    try {
        await Client.update({ deleted: true }, {where: {id: parseInt(idClient,10)},});

        return {
            body: 'Deleted successfully',
            statusCode: 200,
        };
    } catch (error) {
        throw new ErrorOnDelete('Error deleting the client');
    }
};

export const Handler = (event: ApiGatewayParsedEvent) =>
    LambdaResolver(event, domain, [Validators.OFFSET_AND_LIMITS]);