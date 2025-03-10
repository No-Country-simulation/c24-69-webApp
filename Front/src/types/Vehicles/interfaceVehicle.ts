export interface IVehicles {
    id: string
    marca: string
    modelo: string
    patente: string
    status: boolean
}

export interface IVehicleFilters {
    marca: string;
    modelo: string;
    patente: string;
    status: boolean | null;
}