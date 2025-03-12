import { AnimatePresence, motion } from "framer-motion";
import FormCheck from "./FormCheck/FormCheck"
import VehiclesList from "../Admin/Vehicles/VehiclesList";
import listIcon from "../../../assets/list-icon.png";
import vehicleIcon from "../../../assets/truck-icon.png";
import { useEffect, useState } from "react";
import { IVehicleFilters, IVehicles } from "../../../types/Vehicles/interfaceVehicle";
import { fetchVehicles } from "../../../services/fetchVehicles";

const AttendantArea: React.FC = () => {
    const [vehicles, setVehicles] = useState<IVehicles[]>([]);
    const [filters, setFilters] = useState<IVehicleFilters>({marca: '', modelo: '', patente: '', status: null });
    const handleFilter = (newFilters: IVehicleFilters) => {
    setFilters(newFilters);
    };

        useEffect(() => {
            const loadVehicles = async () => {
                try {
                    const allVehicles = await fetchVehicles();
                    const filteredVehicles = allVehicles
                    .filter((vehicle: IVehicles) => {
                        const stateMatch = filters.status === null || filters.status === undefined 
                            ? true  // Si status es null, no filtra por estado
                            : vehicle.status === filters.status; // Si status tiene un valor, filtra por ese valor
                        
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
        
    const [activeArea, setActiveArea] = useState<'forms' | 'vehicles'>('forms'); 

return(
    <section>
    <div className="flex flex-col items-center gap-5">
        {/* Botones para cambiar entre áreas */}
        <div className="filters-container flex gap-4">
        <button
            className={`view-button ${activeArea === "forms" && "view-button-active"}`}
            onClick={() => setActiveArea('forms')}
            >
            <span className="bg-span"></span> {/* Aquí está el span que controla el fondo */}
            <img src={listIcon} alt="Forms Icon" className='icon' />
            <span className='view-text'>Formularios</span>
            </button>
            <button className={`view-button ${activeArea === "vehicles" && "view-button-active"}`} onClick={() => setActiveArea('vehicles')}>
                    <span className="bg-span"></span>
                    <img src={vehicleIcon} alt="List Icon" className='icon' />
                    <span className='view-text'>Vehículos</span>
            </button>
        </div>

        {/* Contenedor con animación */}
        <section className="flex justify-center w-full max-w-6xl h-full overflow-hidden">
            <AnimatePresence mode="wait">
                {activeArea === "forms" && (
                    <motion.div
                        key="forms"
                        initial={{ x: -100, opacity: 0 }} // Aparece desde la izquierda
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -100, opacity: 0 }} // Desaparece hacia la izquierda
                        transition={{ duration: 0.5 }}
                        className="w-full max-w-6xl mb-8"
                    >
                <FormCheck
                    forms={[]}
                    vehicles={[]}
                    onApprove={() => {}}
                    onDisapprove={() => {}}
                />
                </motion.div>
                )}
                
                {activeArea === "vehicles" && (
                    <motion.div
                        key="vehicles"
                        initial={{ x: 100, opacity: 0 }} // Aparece desde la derecha
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 100, opacity: 0 }} // Desaparece hacia la derecha
                        transition={{ duration: 0.5 }}
                        className="w-full max-w-6xl mb-8"
                    >
                <div className='max-w-6xl m-auto px-4'>
                    <VehiclesList
                        vehicles={vehicles}
                        filters={filters}
                        onFilter={handleFilter}
                    />
                </div>
                    </motion.div>
                )}
            </AnimatePresence>
    </section>
    </div>
    </section>
    );
}

export default AttendantArea;