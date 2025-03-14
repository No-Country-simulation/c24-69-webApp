const apiUrl = "https://c24-69-webapp.onrender.com";

export const fetchUsers = async (page: number = 1, limit: number = 10) => {
    const response = await fetch(`${apiUrl}/auth?page=${page}&limit=${limit}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (!response.ok) {
        throw new Error(`Error fetching users: ${response.statusText}`);
    }

    const userData = await response.json();
    return userData; // Asegúrate de que la respuesta contenga los datos y la metadata necesaria.
}

export const fetchUsersGraphic = async (page: number = 1, limit: number = 10) => {
    const response = await fetch(`${apiUrl}/auth?page=${page}&limit=${limit}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (!response.ok) {
        throw new Error(`Error fetching users: ${response.statusText}`);
    }

    const userData = await response.json();
    return userData.data; // Asegúrate de que la respuesta contenga los datos y la metadata necesaria.
}

export const updateUser = async (id: string, updateData: Record<string, string>) => {
    const response = await fetch(`${apiUrl}/auth/${id}`, { // Cambiamos la URL
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData) // Enviar cualquier dato a actualizar
    });

    if (!response.ok) {
        throw new Error('Failed to update user');
    }
    return response.json();
};

