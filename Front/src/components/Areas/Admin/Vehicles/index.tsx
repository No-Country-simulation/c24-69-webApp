import React, { useState } from 'react';
import ConfirmModal from '../../../ConfirmModal';
import { IVehicleFilters } from "../../../../types/Vehicles/interfaceVehicle";
import { disapproveVehicle, reapproveVehicle } from '../../../../services/fetchVehicles';
// import animation from "../../../assets/404-animation.json";
// import Lottie from 'lottie-react';
import VehiclesList from './VehiclesList';
import VehiclesStats from './VehiclesStats';
import list from "../../../../assets/list-icon.png";
import stats from "../../../../assets/stats-icon.png";
import useVehicles from '../../../../hooks/useVehicles';
import { AnimatePresence, motion } from 'framer-motion';

const VehiclesArea: React.FC = () => {
    const [filters, setFilters] = useState<IVehicleFilters>({marca: '', modelo: '', patente: '', status: null });
    const { vehicles, loading, error } = useVehicles(filters);
    const [vehicleToDisapprove, setVehicleToDisapprove] = useState<string | null>(null);
    const [vehicleToReapprove, setVehicleToReapprove] = useState<string | null>(null);
    const [activeArea, setActiveArea] = useState<'list' | 'stats'>('list'); 

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
            onCancel: handleModalClose,
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
            message: "¿Estás seguro de querer aprobar el vehículo?",
            isSuccess: false,
            singleButton: false,
            onConfirm: confirmReapproveVehicle,
            onCancel: handleModalClose,
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

return (
    <section className="area-section">
        {/* Botones de Vista */}
        <div className="filters-container">
        <button 
    className={`view-button ${(() => {
        return activeArea === 'list' ? 'view-button-active' : '';
    })()}`} 
    onClick={() => setActiveArea('list')}
>
                <span className="bg-span"></span>
                <img src={list} alt="List Icon" className='icon' />
                <span className='view-text'>Lista</span>
            </button>
            <button 
    className={`view-button ${(() => {
        return activeArea === 'stats' ? 'view-button-active' : '';
    })()}`} 
    onClick={() => setActiveArea('stats')}
>
                <span className="bg-span"></span>
                <img src={stats} alt="Stats Icon" className='icon'/>
                <span className='view-text'>Gráficos</span>
            </button>
</div>

<AnimatePresence>
    {(loading || error) && (
        <motion.div
            key="loader"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }} // 🔥 Se oculta antes de ser eliminado del DOM
            transition={{ duration: 0.3 }}
            className="loader-banner"
        >
            {loading && <p className='title text-center mb-4'>Cargando vehículos...</p>}
            {error && <p className='error-text'>{error}</p>}
            <div className='loader'></div>
        </motion.div>
    )}
</AnimatePresence>

<AnimatePresence mode="wait">
    {activeArea === "list" && (
        <motion.div
            key="list"
            initial={{ x: -100, opacity: 0 }} // Aparece desde la izquierda
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }} // Desaparece hacia la derecha
            transition={{ duration: 0.5 }}
            className="max-w-6xl m-auto px-4"
        >
                    <VehiclesList
                        vehicles={vehicles}
                        filters={filters}
                        onFilter={handleFilter}
                        onDisapproveVehicle={handleDisapproveVehicle}
                        onReapproveVehicle={handleReapproveVehicle}
                    />
        </motion.div>
    )}


    {activeArea === "stats" && (
        <motion.div
            key="stats"
            initial={{ x: 100, opacity: 0 }} // Aparece desde la derecha
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }} // Desaparece hacia la izquierda
            transition={{ duration: 0.5 }}
            className="max-w-6xl m-auto"
        >
                    <VehiclesStats vehicles={vehicles} filters={filters} />  {/* Agregado el componente de estadísticas */}
        </motion.div>
    )}
</AnimatePresence>

            <ConfirmModal
                show={modalData.show}
                title={modalData.title}
                message={modalData.message}
                onConfirm={handleModalClose}
                onCancel={handleModalClose}
                singleButton={true}
            />
        </section>
    );
};

export default VehiclesArea;