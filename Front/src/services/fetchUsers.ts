const apiUrl = "http://localhost:3000";

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

export const banUser = async (id: string) => {
    const response = await fetch(`${apiUrl}/users/update?id=${id}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        state: false
    })
    });
    
    if (!response.ok) {
    throw new Error('Failed to disable user');
    }
    return response.json();
};

export const reactivateUser = async (id: string) => {
    const response = await fetch(`${apiUrl}/users/update?id=${id}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        state: true
    })
    });
    
    if (!response.ok) {
    throw new Error('Failed to disable user');
    }
    return response.json();
};