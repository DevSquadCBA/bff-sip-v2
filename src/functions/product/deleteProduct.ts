import { Product } from 'models/Product';
import { ErrorOnDelete } from 'types/errors';
import { ApiGatewayParsedEvent } from 'types/response-factory/proxies';
import { Validators } from 'utils/Validator';
import { LambdaResolver } from 'utils/lambdaResolver';

interface Event extends ApiGatewayParsedEvent {
    pathParameters: {
        idProduct: string;
    };
}

const domain = async (event: Event): Promise<{ body: string; statusCode: number }> => {
    const { idProduct } = event.pathParameters;

    try {
        await Product.update({ deleted: true }, {
            where: {
                id: parseInt(idProduct, 10),
            },
        });

        return {
            body: 'Deleted successfully',
            statusCode: 200,
        };
    } catch (error) {
        console.error(error);
        throw new ErrorOnDelete('Error deleting the product');
    }
};

export const Handler = (event: ApiGatewayParsedEvent) =>
    LambdaResolver(event, domain, [Validators.ADMIN_PERMISSION,Validators.OFFSET_AND_LIMITS]);