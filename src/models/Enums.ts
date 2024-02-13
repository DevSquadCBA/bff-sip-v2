export enum SaleStates {
    'presupuesto',      // cuando se crea
    'proforma',         // pago parcial o cuando hace un pago
    'comprobante',      // cuando define las caracteristicas
    'in_order',         // cuando le avisa al proveedor
    'in_provider',      // cuando el proveedor acepta el pedido, aca se disparan los estados del producto
    'delayed_provider', // cuando está todo listo, pero el proveedor tiene demora
    'finished',         // cuando el cliente ya tiene completo esta venta
    'canceled'          // cuando el cliente cancela el pedido por algun motivo
}
export const StatesValues = ['presupuesto', 'proforma', 'comprobante', 'in_order', 'in_provider', 'delayed_provider', 'finished', 'canceled'];

export enum StateProduct{
    'uninitiated',      // 0 - El producto esta en una venta con estado presupuesto o proforma
    'to_confirm',       // 1 - El producto esta en una venta con estado comprobante
    'pending_shipping', // 2 - El producto esta en una venta con estado in_order
    'shipping',         // 3 - Envio en proceso de parte del proveedor
    'on_deposit'        // 4 - El producto ya esta en depósito
}

export const StateProductValues = ['uninitiated', 'to_confirm', 'pending_shipping', 'shipping', 'on_deposit'];