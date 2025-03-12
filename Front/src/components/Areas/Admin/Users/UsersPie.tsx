import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { fetchUsers } from '../../../../services/fetchUsers';  // Asegúrate de importar el servicio correctamente
import { IUser } from '../../../../types/Users/interfaceUser';  // Asegúrate de importar la interfaz IUser

const UsersPie: React.FC = () => {
    const [users, setUsers] = useState<IUser[]>([]);  // Estado para almacenar los usuarios
    const [series, setSeries] = useState([0, 0, 0, 0]);  // Inicializo con 0 para cada categoría
    const [options] = useState<ApexOptions>({
        chart: {
            type: 'pie' as const,
        },
        labels: ['Usuarios Activos', 'Usuarios Inactivos', 'Operarios', 'Encargados'],
        colors: ['#3f51ff', '#EE00EE', '#7e39b7', '#301048'],
        legend: {
            position: 'right',
            fontSize: '18px',
            offsetX: 0,
            offsetY: 50,
            labels: {
                colors: '#000',
                useSeriesColors: false,
            },
            itemMargin: {
                horizontal: 5,
                vertical: 10,
            },
        },
        responsive: [
            {
                breakpoint: 1024,
                options: {
                    chart: {
                        width: '150%',
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
                        width: '130%',
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
                        width: '110%',
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
                    size: '150%',
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
                const userData = await fetchUsers();  // Llamamos a la función para obtener los usuarios
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
            const activeUsers = users.filter(user => user.isActive).length;
            const inactiveUsers = users.filter(user => !user.isActive).length;
            const operariosUsers = users.filter(user => user.rol === 'operario').length;
            const encargadosUsers = users.filter(user => user.rol === 'encargado').length;

            setSeries([activeUsers, inactiveUsers, operariosUsers, encargadosUsers]);
        }
    }, [users]);  // Dependencia de users, actualiza cuando los usuarios cambian

    return (
        <div className="users-banner">
            <ApexCharts options={options} series={series} type="pie" width={550} />
        </div>
    );
};

export default UsersPie;