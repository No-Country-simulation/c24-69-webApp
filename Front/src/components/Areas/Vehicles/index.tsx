import React, { useState, useEffect } from 'react';
import ConfirmModal from '../../ConfirmModal';
import { IVehicles, IVehicleFilters } from "../../../types/Vehicles/interfaceVehicle";
import { fetchVehicles, disapproveVehicle, reapproveVehicle } from '../../../services/fetchVehicles';
import animation from "../../../assets/404-animation.json";
import Lottie from 'lottie-react';
import VehiclesList from './VehiclesList';
import VehiclesFilters from './VehiclesFilters';  // Agregado para los filtros
import VehiclesStats from './VehiclesStats';  // Agregado para los gráficos

const VehiclesArea: React.FC = () => {
    const [vehicles, setVehicles] = useState<IVehicles[]>([]);
    const [filters, setFilters] = useState<IVehicleFilters>({marca: '', modelo: '', patente: '', state: 'all' });
    const [vehicleToDisapprove, setVehicleToDisapprove] = useState<string | null>(null);
    const [vehicleToReapprove, setVehicleToReapprove] = useState<string | null>(null);
    const [modalData, setModalData] = useState<{
        show: boolean;
        title: string;
        message: string;
        isSuccess: boolean;
        onConfirm?: () => void;
        onCancel?: () => void;
        singleButton?: boolean;
    }>({
        show: false,
        title: "",
        message: "",
        isSuccess: false,
        singleButton: true
    });

    useEffect(() => {
        const loadVehicles = async () => {
            try {
                const allVehicles = await fetchVehicles();
                const filteredVehicles = allVehicles
                    .filter((vehicle: { state: boolean; }) => {
                        const stateMatch =
                            filters.state === 'all' ||
                            (filters.state === 'approved' && vehicle.state) ||
                            (filters.state === 'disapproved' && !vehicle.state);
                        return stateMatch;
                    })
                    .sort((a: { marca: string; }, b: { marca: string; }) => {
                        if (filters.marca === 'asc') {
                            return a.marca.localeCompare(b.marca);
                        } else if (filters.marca === 'desc') {
                            return b.marca.localeCompare(a.marca);
                        } else {
                            return 0;
                        }
                    })
                    .sort((a: { modelo: string; }, b: { modelo: string; }) => {
                        if (filters.modelo === 'asc') {
                            return a.modelo.localeCompare(b.modelo);
                        } else if (filters.modelo === 'desc') {
                            return b.modelo.localeCompare(a.modelo);
                        } else {
                            return 0;
                        }
                    });

                setVehicles(filteredVehicles);
            } catch (error) {
                console.error("Error al cargar vehículos: ", error);
            }
        };

        loadVehicles();
    }, [filters]);

    const handleFilter = (newFilters: IVehicleFilters) => {
        setFilters(newFilters);
    };

    const handleModalClose = () => {
        setModalData((prev) => ({ ...prev, show: false }));
    };

    const handleDisapproveVehicle = (id: string) => {
        setVehicleToDisapprove(id);
        setModalData({
            show: true,
            title: "Confirmar Vehículo Desaprobado",
            message: "¿Estás seguro de desaprobar este vehículo?",
            isSuccess: false,
            singleButton: false,
            onConfirm: confirmDisapproveVehicle,
        });
    };

    const confirmDisapproveVehicle = async () => {
        if (vehicleToDisapprove) {
            try {
                await disapproveVehicle(vehicleToDisapprove);
                setModalData({
                    show: true,
                    title: "Vehículo Desaprobado",
                    message: "Vehículo desaprobado exitosamente",
                    isSuccess: true,
                    singleButton: true,
                });
            } catch (error) {
                console.error("Error al desaprobar vehículo: ", error);
                setModalData({
                    show: true,
                    title: "Error",
                    message: "Error al desaprobar vehículo.",
                    isSuccess: false,
                });
            }
        }
    };

    const handleReapproveVehicle = (id: string) => {
        setVehicleToReapprove(id);
        setModalData({
            show: true,
            title: "Reactivar Vehículo",
            message: "Reactivación de Vehículo exitosa.",
            isSuccess: false,
            singleButton: false,
            onConfirm: confirmReapproveVehicle,
        });
    };

    const confirmReapproveVehicle = async () => {
        if (vehicleToReapprove) {
            try {
                await reapproveVehicle(vehicleToReapprove); // Enviar el id del vehículo
                setModalData({
                    show: true,
                    title: "Reactivar Vehículo",
                    message: "El vehículo ha sido restaurado exitosamente.",
                    isSuccess: true,
                });
            } catch (error) {
                console.error("Error al reactivar vehículo: ", error);
                setModalData({
                    show: true,
                    title: "Error",
                    message: "Error al reactivar vehículo.",
                    isSuccess: false,
                });
            }
        }
    };

    const [view, setView] = useState<string>('table');

    const handleChangeView = (view: string) => {
        setView(view);
    };

    if (vehicles.length === 0) {
        return (
            <div className='banner-container'>
                <div className='banner-child-container'>
                    <div className='text-banner-area'>
                        <h1 className='title text-center'>¡Algo salió mal!</h1>
                        <p className='text-active text-center'>No hay vehículos registrados o activos aún...</p>
                    </div>
                    <div>
                        <Lottie 
                            animationData={animation} 
                            loop 
                            className="animation-404" 
                        />            
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex flex-row items-center gap-4 mt-4">
                <button className={`buttonFilter ${view === "table" && "buttonFilterActive"}`} onClick={() => handleChangeView('table')}>Tabla</button>
                <button className={`buttonFilter ${view === "stats" && "buttonFilterActive"}`} onClick={() => handleChangeView('pie')}>Gráficos</button>
            </div>

            {view === 'table' && (
                <div className='col-span-3'>
                    <VehiclesFilters onFilter={handleFilter} />  {/* Agregado el componente de filtros */}
                    <VehiclesList
                        vehicles={vehicles}
                        filters={filters}
                        onFilter={handleFilter}
                        onDisapproveVehicle={handleDisapproveVehicle}
                        onReapproveVehicle={handleReapproveVehicle}
                    />
                </div>
            )}

            {view === 'pie' && (
                <div className='col-span-3'>
                    <VehiclesStats vehicles={vehicles} filters={filters} />  {/* Agregado el componente de estadísticas */}
                </div>
            )}

            <ConfirmModal
                show={modalData.show}
                title={modalData.title}
                message={modalData.message}
                onConfirm={handleModalClose}
                singleButton={true}
            />
        </div>
    );
};

export default VehiclesArea;