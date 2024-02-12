export enum SaleStates {
    'presupuesto',      // cuando se crea
    'proforma',         // pago parcial o cuando hace un pago
    'comprobante',      // cuando define las caracteristicas
    'in_order',         // cuando le avisa al proveedor
    'in_provider',      // cuando el proveedor acepta el pedido, aca se disparan los estados del producto
    'delayed_provider', // cuando está todo listo, pero el proveedor tiene demora
    'finished',     
    'canceled'
}
export const StatesValues = ['presupuesto', 'proforma', 'comprobante', 'in_order', 'in_provider', 'delayed_provider', 'finished', 'canceled']