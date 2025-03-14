import { IUserFilters } from "../types/Users/interfaceUser";

const apiUrl = "https://c24-69-webapp.onrender.com";

const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return null;
}

export const fetchUsers = async (
    page: number = 1,
    limit: number = 10,
    filters: IUserFilters
) => {
    const token = getCookie("authToken");

    if (!token) {
        throw new Error("No se encontró el token de autenticación.");
    }

    const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        sortOrder: filters.sortOrder,
        rol: filters.rol,
    });

    const response = await fetch(`${apiUrl}/auth?${queryParams.toString()}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error(`Error fetching users: ${response.statusText}`);
    }

    return await response.json();
};

export const fetchUsersGraphic = async (page: number = 1, limit: number = 10) => {
    const token = getCookie("authToken"); 

    if (!token) {
        throw new Error("No se encontró el token de autenticación.");
    }

    const response = await fetch(`${apiUrl}/auth?page=${page}&limit=${limit}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error(`Error fetching users: ${response.statusText}`);
    }

    const userData = await response.json();
    return userData.data; // Asegúrate de que la respuesta contenga los datos y la metadata necesaria.
}

export const updateUser = async (id: number, rol: string) => {
    const token = getCookie("authToken"); 
    try {
        console.log("Llamada de updateUser y datos a enviar: ", id, rol)
        const response = await fetch(`${apiUrl}/auth/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ rol }),  // Solo el campo 'rol'
        });

        if (!response.ok) {
            throw new Error(`Error en la actualización: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error en updateUser:", error);
        throw error;
    }
};


