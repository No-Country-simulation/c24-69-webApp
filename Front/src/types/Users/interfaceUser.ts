export interface IUser {
    id: string
    email: string
    nombre: string
    rol: string
    isActive: boolean
}

export interface IUserFilters {
    nombre: string;
    rol: string;
    isActive: boolean | 'all';
}