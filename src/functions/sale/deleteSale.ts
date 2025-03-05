import { Sale } from 'models/Sale';
import { ApiGatewayParsedEvent } from 'types/response-factory/proxies';
import { Validators } from 'utils/Validator';
import { LambdaResolver } from 'utils/lambdaResolver';

interface Event extends ApiGatewayParsedEvent {
    pathParameters: {
        idSale: string;
    };
}

const domain = async (event: Event): Promise<{ body: string; statusCode: number }> => {
    const { idSale } = event.pathParameters;

    try {
        await Sale.update({ deleted: true }, {
            where: {
                id: parseInt(idSale, 10),
            },
        });

        return {
            body: 'Borrado correctamente',
            statusCode: 200,
        };
    } catch (error) {
        console.error(error);
        return {
            body: 'Error borrando la venta',
            statusCode: 500,
        };
    }
};

export const Handler = (event: ApiGatewayParsedEvent) =>
    LambdaResolver(event, domain, [Validators.OFFSET_AND_LIMITS]);