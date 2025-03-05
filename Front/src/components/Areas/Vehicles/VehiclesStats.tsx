/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { fetchVehicles } from '../../../services/fetchVehicles'; // Tu función de fetch
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { IVehicleFilters, IVehicles } from '../../../types/Vehicles/interfaceVehicle';

// Registrar los componentes necesarios de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface VehiclesStatsProps {
    vehicles: IVehicles[];
    filters: IVehicleFilters;
}

const VehiclesStats: React.FC<VehiclesStatsProps> = () => {
    const [vehicles, setVehicles] = useState<IVehicles[]>([]);  // Guardaremos los vehículos obtenidos
    const [approvedCount, setApprovedCount] = useState(0); // Número de vehículos aprobados
    const [disapprovedCount, setDisapprovedCount] = useState(0); // Número de vehículos desaprobados

    // Obtener los vehículos desde la API
    useEffect(() => {
        const loadVehicles = async () => {
            try {
                const vehiclesData = await fetchVehicles();
                setVehicles(vehiclesData);

                // Contar cuántos vehículos están aprobados y desaprobados
                const approved = vehiclesData.filter((vehicle: IVehicles) => vehicle.state === "approved").length;
                const disapproved = vehiclesData.filter((vehicle: IVehicles) => vehicle.state === "disapproved").length;

                setApprovedCount(approved);
                setDisapprovedCount(disapproved);
            } catch (error) {
                console.error("Error al obtener los vehículos:", error);
            }
        };

        loadVehicles();
    }, [setVehicles]);  // Solo se ejecuta una vez cuando el componente se monta

    // Configuración de los datos del gráfico
    const data = {
        labels: ['Aprobados', 'Desaprobados'],  // Etiquetas del gráfico
        datasets: [
            {
                label: 'Número de vehículos',  // Etiqueta de la barra
                data: [approvedCount, disapprovedCount],  // Datos para cada categoría
                backgroundColor: ['#4CAF50', '#FF5733'],  // Colores para cada barra
                borderColor: ['#388E3C', '#C0392B'],  // Colores del borde de las barras
                borderWidth: 1,  // Ancho del borde de las barras
            },
        ],
    };

    // Opciones para el gráfico
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Estadísticas de Vehículos',
            },
        },
    };

    return (
        <section className="banner-container">
            <h2 className="title text-center">Estadísticas de Vehículos</h2>
            <div className="stats-container">
                {/* Gráfico de barras */}
                <Bar data={data} options={options} />
            </div>
        </section>
    );
};

export default VehiclesStats;