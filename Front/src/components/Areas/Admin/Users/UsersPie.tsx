import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { fetchUsersGraphic } from '../../../../services/fetchUsers';  // Asegúrate de importar el servicio correctamente
import { IUser } from '../../../../types/Users/interfaceUser';  // Asegúrate de importar la interfaz IUser

const UsersPie: React.FC = () => {
    const [users, setUsers] = useState<IUser[]>([]);  // Estado para almacenar los usuarios
    const [series, setSeries] = useState([0, 0, 0, 0]);  // Inicializo con 0 para cada categoría
    const [options] = useState<ApexOptions>({
        chart: {
            type: 'pie' as const,
        },
        labels: ['Usuarios Activos', 'Usuarios Inactivos', 'Operarios', 'Encargados'],
        colors: ['#105C93', '#9bc1ff'],
        legend: {
            position: 'right',
            fontSize: '18px',
            offsetX: -10,
            offsetY: 120,
            labels: {
                colors: '#fff',
                useSeriesColors: false,
            },
            itemMargin: {
                horizontal: 15,
                vertical: 25,
            },
            markers: {
                size: 10,
                offsetX: -10, // Ajusta separación entre el color y el texto
            },
        },
        responsive: [
            {
                breakpoint: 1024,
                options: {
                    chart: {
                        width: '100%',
                        height: '100%'
                    },
                    legend: {
                        position: 'bottom',
                        offsetX: 0,
                        offsetY: 0,
                        fontSize: '14px',
                        itemMargin: {
                            horizontal: 10,
                            vertical: 10,
                        },
                    },
                },
            },
            {
                breakpoint: 768,
                options: {
                    chart: {
                        width: '80%',
                        height: '80%'
                    },
                    legend: {
                        position: 'bottom',
                        offsetX: 0,
                        offsetY: 0,
                        fontSize: '10px',
                        itemMargin: {
                            horizontal: 5,
                            vertical: 5,
                        },
                    },
                },
            },
            {
                breakpoint: 620,
                options: {
                    chart: {
                        width: '50%',
                        height: '50%'
                    },
                    legend: {
                        position: 'bottom',
                        offsetX: 0,
                        offsetY: 0,
                        fontSize: '8px',
                        itemMargin: {
                            horizontal: 1,
                            vertical: 1,
                        },
                    },
                },
            },
        ],
        plotOptions: {
            pie: {
                donut: {
                    size: '100%',
                },
            },
        },
        tooltip: {
            theme: 'dark',
        },
    });

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const userData = await fetchUsersGraphic();  // Llamamos a la función para obtener los usuarios
                setUsers(userData);  // Guardamos los usuarios en el estado
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        loadUsers();
    }, []);  // Solo se ejecuta al montar el componente.

    // useEffect para actualizar la serie de datos cada vez que los usuarios cambian
    useEffect(() => {
        if (users.length > 0) {
            const operariosUsers = users.filter(user => user.rol === 'OPERARIO').length;
            const encargadosUsers = users.filter(user => user.rol === 'ENCARGADO').length;

            setSeries([operariosUsers, encargadosUsers]);
        }
    }, [users]);  // Dependencia de users, actualiza cuando los usuarios cambian

    return (
        <div className="users-banner">
            <ApexCharts options={options} series={series} type="pie" width={800} height={800} />
        </div>
    );
};

export default UsersPie;