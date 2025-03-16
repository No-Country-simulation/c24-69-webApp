export interface IUser {
    id: number;  // En el backend es 'number', no 'string'
    nombre: string;
    email: string;
    dni: string;
    rol: string[];  // Se corrige para coincidir con el backend
    createdAt: string;
    updatedAt?: string;  // Puede ser null en la base de datos
}

export interface IUserFilters {
    sortOrder: "asc" | "desc";
    rol: string;
}
