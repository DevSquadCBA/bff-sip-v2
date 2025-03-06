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
} & Sale
interface Event extends ApiGatewayParsedEvent {
    pathParameters: {
        idSale: string
    },
    body: string
}

const domain = async (event:Event): Promise<{body:string, statusCode:number}> => {
    const id = parseInt(event.pathParameters.idSale)
    if(!id){throw new InvalidIdError('Invalid idSale');}

    const saleToUpdate = typeof event.body === 'string'? JSON.parse(event.body) as ISaleUpdateContract : event.body;

    const mappedProducts = saleToUpdate.products.map(e=>({productId: e.id || e.productId, quantity: e.quantity, state: e.state, details: e.details, price: e.salePrice}));

    for(const product of mappedProducts){
        await SaleProduct.update(product, {where: {saleId: id, productId: product.productId}, logging:true})
    }
    let total = mappedProducts.reduce((acc, product)=> {
        if(!product.price || !product.quantity){return acc}
        return acc + (product.quantity * product.price)
    }, 0);
    console.log({total, mappedProducts});
    // actualizo el total de la venta, por si acaso
    await Sale.update({total}, {where: {id: id}});

    let msg = 'Se han agregado detalles a los productos';

    // para pasar de presupuesto a proforma, debo tener un pago inicial
    if(saleToUpdate.state == SaleStates.proforma && saleToUpdate.paid){
        const sale = (await Sale.findByPk(id))?.get({plain:true});
        const paid = parseFloat(sale.paid) + (saleToUpdate.paid);
        await Sale.update({state: SaleStates.proforma, paid}, {where: {id: id}});
    }
    
    // para pasar de proforma a comprobante, debo tener detalles en todos los productos
    if(saleToUpdate.state == SaleStates.comprobante){
        const allProductsHaveDetails = saleToUpdate.products.every(product=>product.details && product.details?.length>0)
        // si todos los producto no tienen detalle, devuelvo un error
        if(!allProductsHaveDetails){return {body: "No se han ingresado detalles en todos los productos", statusCode: 400}}
        // el deadline comienza cuando se convierte a comprobante la venta
        let deadline = null;
        const sale = (await Sale.findByPk(id))?.get({plain:true});
        const paid = parseFloat(sale.paid) + (parseFloat(saleToUpdate.amount||'') || 0);
        if(saleToUpdate.state  === SaleStates.comprobante ){
            deadline = dayjs().add(sale.estimatedDays, 'day');
        }
        await Sale.update({state: saleToUpdate.state, deadline, paid}, {where: {id: id}});
        msg = `Se ha actualizado el estado de la venta a ${saleToUpdate.state}`;
    }
    return {
        body: msg,
        statusCode: 200
    }
}
/** @TODO podrias validar que el json que ingresa, sea efectivamente del type que definís en ISaleUpdateContract */
export const Handler = (event:ApiGatewayParsedEvent)=>LambdaResolver(event, domain, [Validators.ID_SALE, Validators.VALID_JSON])