import { useState, useEffect } from 'react';
import { IVehicles, IVehicleFilters } from '../types/Vehicles/interfaceVehicle';
import { fetchVehicles } from '../services/fetchVehicles';

const useVehicles = (filters: IVehicleFilters) => {
    const [vehicles, setVehicles] = useState<IVehicles[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadVehicles = async () => {
            setLoading(true);
            setError(null);
            try {
                const allVehicles = await fetchVehicles();
                
                // Filtrado por estado
                const filteredVehicles = allVehicles.filter((vehicle: IVehicles) => {
                    const stateMatch = filters.status === null || filters.status === undefined 
                        ? true 
                        : vehicle.status === filters.status;
                    return stateMatch;
                });

                // Ordenamiento: Marca y Modelo
                const sortedVehicles = filteredVehicles.sort((a: { marca: string; modelo: string; }, b: { marca: string; modelo: string; }) => {
                    // Primero por Marca
                    if (filters.marca === 'asc') {
                        return a.marca.localeCompare(b.marca);
                    } else if (filters.marca === 'desc') {
                        return b.marca.localeCompare(a.marca);
                    }

                    // Si las marcas son iguales, ordenar por Modelo
                    if (filters.modelo === 'asc') {
                        return a.modelo.localeCompare(b.modelo);
                    } else if (filters.modelo === 'desc') {
                        return b.modelo.localeCompare(a.modelo);
                    }
                    return 0;
                });

                setVehicles(sortedVehicles);
            } catch (err) {
                console.error("Error al cargar vehículos: ", err);
                setError("Error al cargar vehículos. Intente nuevamente.");
            } finally {
                setLoading(false);
            }
        };

        loadVehicles();
    }, [filters]);  // Dependencia en `filters` para recargar los vehículos cuando cambien

    return { vehicles, loading, error };
};

export default useVehicles;