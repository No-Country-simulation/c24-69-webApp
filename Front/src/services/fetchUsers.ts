const apiUrl = "http://localhost:3000";

const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return null;
}

export const fetchUsers = async (page: number = 1, limit: number = 10) => {
    // Obtener el token de las cookies
    const token = getCookie("authToken"); 

    if (!token) {
        throw new Error("No se encontró el token de autenticación.");
    }

    const response = await fetch(`${apiUrl}/auth?page=${page}&limit=${limit}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Incluir el token en la cabecera
        }
    });

    if (!response.ok) {
        throw new Error(`Error fetching users: ${response.statusText}`);
    }

    const userData = await response.json();
    return userData; // Asegúrate de que la respuesta contenga los datos y la metadata necesaria.
}

export const fetchUsersGraphic = async (page: number = 1, limit: number = 10) => {
    // Obtener el token de las cookies
    const token = getCookie("authToken"); 

    if (!token) {
        throw new Error("No se encontró el token de autenticación.");
    }

    const response = await fetch(`${apiUrl}/auth?page=${page}&limit=${limit}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Incluir el token en la cabecera
        }
    });

    if (!response.ok) {
        throw new Error(`Error fetching users: ${response.statusText}`);
    }

    const userData = await response.json();
    return userData.data; // Asegúrate de que la respuesta contenga los datos y la metadata necesaria.
}

export const updateUser = async (id: string, updateData: Record<string, string>) => {
    const token = getCookie("authToken");
    const response = await fetch(`${apiUrl}/auth/${id}`, { // Cambiamos la URL
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updateData) // Enviar cualquier dato a actualizar
    });

    if (!response.ok) {
        throw new Error('Failed to update user');
    }
    return response.json();
};

