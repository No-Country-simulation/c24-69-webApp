const apiUrl = "http://localhost:3000";

export const fetchUsers = async () => {
    const response = await fetch(`${apiUrl}/users`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    })
    if (!response.ok) {
        throw new Error(`Error fetching user: ${response.statusText}`);
    }
    const userData = await response.json();
    return userData;
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