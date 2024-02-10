import { Budget } from 'models/Budget';
import { ApiGatewayParsedEvent } from 'types/response-factory/proxies';
import { Validators } from 'utils/Validator';
import { LambdaResolver } from 'utils/lambdaResolver';

interface Event extends ApiGatewayParsedEvent {
    pathParameters: {
        id: string;
    };
}

const domain = async (event: Event): Promise<{ body: string; statusCode: number }> => {
    const { id } = event.pathParameters;

    try {
        await Budget.destroy({
            where: {
                id: parseInt(id, 10),
            },
        });

        return {
            body: 'Deleted successfully',
            statusCode: 200,
        };
    } catch (error) {
        console.error(error);
        return {
            body: 'Error deleting the budget',
            statusCode: 500,
        };
    }
};

export const Handler = (event: ApiGatewayParsedEvent) =>
    LambdaResolver(event, domain, [Validators.OFFSET_AND_LIMITS]);