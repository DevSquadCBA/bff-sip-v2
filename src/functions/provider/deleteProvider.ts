import { Provider } from 'models/Provider';
import { ApiGatewayParsedEvent } from 'types/response-factory/proxies';
import { Validators } from 'utils/Validator';
import { LambdaResolver } from 'utils/lambdaResolver';

interface Event extends ApiGatewayParsedEvent {
    pathParameters: {
        idProvider: string;
    };
}

const domain = async (event: Event): Promise<{ body: string; statusCode: number }> => {
    const { idProvider } = event.pathParameters;

    try {
        await Provider.destroy({
            where: {
                id: parseInt(idProvider, 10),
            },
        });

        return {
            body: 'Deleted successfully',
            statusCode: 200,
        };
    } catch (error) {
        console.error(error);
        return {
            body: 'Error deleting the provider',
            statusCode: 500,
        };
    }
};

export const Handler = (event: ApiGatewayParsedEvent) =>
    LambdaResolver(event, domain, [Validators.ADMIN_PERMISSION,Validators.OFFSET_AND_LIMITS]);