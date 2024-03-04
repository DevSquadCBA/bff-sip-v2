import { SaleStates } from 'models/Enums';
import {Sale, ProductsInSale } from 'models/Sale';
import { SaleProduct } from 'models/SaleProduct';
import { ApiGatewayParsedEvent } from 'types/response-factory/proxies';
import { Validators } from 'utils/Validator';
import { LambdaResolver } from 'utils/lambdaResolver';
type ISaleUpdateContract = {
    state: SaleStates,
    products: Omit<ProductsInSale,'saleProducts'>[]
}
interface Event extends ApiGatewayParsedEvent {
    pathParameters: {
        id: string
    },
    body: string
}

const domain = async (event:Event): Promise<{body:string, statusCode:number}> => {
    const id = parseInt(event.pathParameters.id)
    const parsedBody = JSON.parse(event.body) as ISaleUpdateContract;
    /** @TODO esto esta bueno, usarlo como un utils, para hacerlo envarios lados, limpiaría el body de keys invalidas */
    const saleToUpdate = Object.keys(parsedBody).map(key=>{
        if(key as keyof ISaleUpdateContract){
            return parsedBody[key as keyof ISaleUpdateContract]
        }
    })as unknown as ISaleUpdateContract;
    await SaleProduct.bulkUpdate(id, saleToUpdate.products);
    let msg = 'Se han agregado detalles a los productos';
    const allProductsHaveDetails = saleToUpdate.products.every(product=>product.details && product.details?.length>0)
    if(allProductsHaveDetails && saleToUpdate.state !== SaleStates.proforma){
        await Sale.update({state: saleToUpdate.state}, {where: {id: id}});
        msg = 'Se ha actualizado el estado de la venta'
    }
    return {
        body: msg,
        statusCode: 200
    }

}
/** @TODO podrias validar que el json que ingresa, sea efectivamente del type que definís en ISaleUpdateContract */
export const Handler = (event:ApiGatewayParsedEvent)=>LambdaResolver(event, domain, [Validators.ID_SALE, Validators.VALID_JSON])