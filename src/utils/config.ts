export enum Entities {
    INSTALACIONES= "budgets_instalaciones",
    MUEBLES= "budgets_muebles",
    PUERTAS= "budgets_puertas"
}
export const entityMapping: { [key: string]: Entities } = {
    instalaciones: Entities.INSTALACIONES,
    muebles: Entities.MUEBLES,
    puertas: Entities.PUERTAS
};