export interface IUser {
    tournaments: []
    id: string
    email: string
    name: string
    tokenFirebase: string
    birthdate: string
    role: string
    state: boolean
}

export interface IUserFilters {
    name: string;
    role: string;
    state: 'all' | 'active' | 'inactive';
}