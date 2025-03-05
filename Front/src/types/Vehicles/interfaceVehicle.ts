export interface IVehicles {
    id: string
    marca: string
    modelo: string
    patente: string
    state: string
}

export interface IVehicleFilters {
    marca: string;
    modelo: string;
    patente: string,
    state: 'all' | 'approved' | 'disapproved';
}