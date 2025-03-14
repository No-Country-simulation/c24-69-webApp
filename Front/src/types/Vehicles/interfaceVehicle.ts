export interface IVehicles {
    id: string
    marca: string
    modelo: string
    patente: string
    status: boolean
}

export interface IVehicleCreate {
    marca: string;
    modelo: string;
    patente: string;
}

export interface IVehicleFilters {
    marca: string;
    modelo: string;
    patente: string;
    status: boolean | null;
}