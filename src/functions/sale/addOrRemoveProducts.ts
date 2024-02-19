import { ISale, SaleWithProduct } from 'models/Sale';
import { SaleProduct,IProductToAdd } from 'models/SaleProduct';
import { ApiGatewayParsedEvent } from 'types/response-factory/proxies';
import { Validators } from 'utils/Validator';
import { LambdaResolver } from 'utils/lambdaResolver';


interface Event extends ApiGatewayParsedEvent {
    pathParameters: {
        idSale: string
    },
    body: string
}

const domain = async (event:Event): Promise<{body:boolean, statusCode:number}> => {
    try{
        const productsInput:IProductToAdd[] = JSON.parse(event.body);
        const saleId = event.pathParameters.idSale;
        const salesProducts = await SaleProduct.findAll({where: {saleId}})
        if(!salesProducts){return {body: false,statusCode: 204}}
        
        const productsInSale = salesProducts.map(e=>e.get({plain:true})) as {saleId: number, productId: number, quantity: number}[];
        console.dir(productsInSale);
        // estos son los que hay que agregar
        const nuevos = productsInput.filter(product=>!productsInSale.some(e=>e.productId == product.id)).map(e=>({saleId,productId: e.id, quantity: e.quantity}));
        // estos son los que hay que actualizar el quantity nomas
        const existentes = productsInSale.filter(product=>productsInput.some(e=>e.id == product.productId)).map(e=>({saleId:parseInt(saleId),productId:e.productId, quantity: e.quantity}));
        // estos ya no vinieron en el input, por ende hay que borrarlos
        const noExisten = productsInSale.filter(product=>!productsInput.some(e=>e.id == product.productId)).map(e=>({saleId,productId:e.productId, quantity: e.quantity}));

        console.dir({new:nuevos,allready: existentes, not:noExisten});
        
        const queries = [
            nuevos?SaleProduct.bulkCreate(nuevos):'',
            existentes?existentes.map(e=>SaleProduct.update({quantity: e.quantity}, {where: {saleId: e.saleId, productId: e.productId}})):'',
            noExisten?SaleProduct.destroy({where: {productId: noExisten.map(e=>e.productId)}}):''
        ]
        await Promise.all(queries);
        return {
            body: true,
            statusCode: 200
        }    
    }catch(e:any){
        console.error(e);
        throw e;
    }
}

export const Handler = (event:ApiGatewayParsedEvent)=>LambdaResolver(event, domain, [Validators.ID_SALE, Validators.VALID_JSON])