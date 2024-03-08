import dayjs from 'dayjs';
import { SaleStates } from 'models/Enums';
import {Sale, ProductsInSale } from 'models/Sale';
import { SaleProduct } from 'models/SaleProduct';
import { InvalidIdError } from 'types/errors';
import { ApiGatewayParsedEvent } from 'types/response-factory/proxies';
import { Validators } from 'utils/Validator';
import { LambdaResolver } from 'utils/lambdaResolver';
type ISaleUpdateContract = {
    state: SaleStates,
    products: Omit<ProductsInSale,'saleProducts'>[]
    amount?: string
}
interface Event extends ApiGatewayParsedEvent {
    pathParameters: {
        idSale: string
    },
    body: string
}

const domain = async (event:Event): Promise<{body:string, statusCode:number}> => {
    const id = parseInt(event.pathParameters.idSale)
    if(!id){
        throw new InvalidIdError('Invalid idSale');
    }
    const saleToUpdate = JSON.parse(event.body) as ISaleUpdateContract;
    const mappedProducts = saleToUpdate.products.map(e=>({productId: e.id || e.productId, quantity: e.quantity, state: e.state, details: e.details}))
    for(const product of mappedProducts){
        await SaleProduct.update(product, {where: {saleId: id, productId: product.productId}, logging:true})
    }
    let msg = 'Se han agregado detalles a los productos';
    const allProductsHaveDetails = saleToUpdate.products.every(product=>product.details && product.details?.length>0)
    if(allProductsHaveDetails && saleToUpdate.state !== SaleStates.proforma){
        let deadline = null;
        const sale = (await Sale.findByPk(id))?.get({plain:true});
        const paid = parseFloat(sale.paid) + (parseFloat(saleToUpdate.amount||'') || 0);
        if(saleToUpdate.state  === SaleStates.comprobante ){
            deadline = dayjs().add(sale.estimatedDays, 'day');
        }
        await Sale.update({state: saleToUpdate.state, deadline, paid}, {where: {id: id}});
        msg = 'Se ha actualizado el estado de la venta'
    }
    return {
        body: msg,
        statusCode: 200
    }
}
/** @TODO podrias validar que el json que ingresa, sea efectivamente del type que definís en ISaleUpdateContract */
export const Handler = (event:ApiGatewayParsedEvent)=>LambdaResolver(event, domain, [Validators.ID_SALE, Validators.VALID_JSON])