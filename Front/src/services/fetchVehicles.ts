const apiUrl = "http://localhost:3000";

export const fetchVehicles = async () => {
    const response = await fetch(`${apiUrl}/vehicles`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error(`Error fetching vehicles: ${response.statusText}`);
    }

    const { data } = await response.json(); // Extraer solo `data`
    return data; // Devolver solo la lista de vehículos
};

export const disapproveVehicle = async (id: string) => {
    const response = await fetch(`${apiUrl}/vehicles/update?id=${id}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        state: false
    })
    });
    
    if (!response.ok) {
    throw new Error('Failed to disapprove vehicle');
    }
    return response.json();
};

export const reapproveVehicle = async (id: string) => {
    const response = await fetch(`${apiUrl}/vehicles/update?id=${id}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        state: true
    })
    });
    
    if (!response.ok) {
    throw new Error('Failed to reapprove vehicle');
    }
    return response.json();
};