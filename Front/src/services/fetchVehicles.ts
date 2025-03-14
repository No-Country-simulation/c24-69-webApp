import { IVehicleCreate } from "../types/Vehicles/interfaceVehicle";
import Cookies from "js-cookie";

const apiUrl = "https://c24-69-webapp.onrender.com";

export const createVehicle = async (vehicleData: IVehicleCreate) => {
    const response = await fetch(`${apiUrl}/vehiculos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(vehicleData),
    });

    if (!response.ok) {
        throw new Error(`Error al crear vehículo: ${response.statusText}`);
    }
    return await response.json();
};

export const fetchVehicles = async () => {
    const response = await fetch(`${apiUrl}/vehiculos`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${Cookies.get("authToken")}`,
        },
    });

    if (!response.ok) {
        throw new Error(`Error fetching vehicles: ${response.statusText}`);
    }

    const { data } = await response.json(); // Extraer solo `data`
    console.log("Este es la data del vehicles", data);
    return data; // Devolver solo la lista de vehículos
};

export const disapproveVehicle = async (id: string) => {
    const response = await fetch(`${apiUrl}/vehiculos/${id}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        status: false
    })
    });
    
    if (!response.ok) {
    throw new Error('Failed to disapprove vehicle');
    }
    return response.json();
};

export const reapproveVehicle = async (id: string) => {
    const response = await fetch(`${apiUrl}/vehiculos/${id}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        status: true
    })
    });
    
    if (!response.ok) {
    throw new Error('Failed to reapprove vehicle');
    }
    return response.json();
};