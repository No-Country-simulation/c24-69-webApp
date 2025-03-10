import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import UsersArea from "../../components/Areas/Users";
// import VehiclesArea from "../../components/Areas/Vehicles";
import userIcon from "../../assets/user-icon.png";
import truckIcon from "../../assets/truck-icon.png";
import VehiclesArea from "../../components/Areas/Vehicles";

const AdminPage: React.FC = () => {
    // Estado para controlar qué área se muestra
    const [activeArea, setActiveArea] = useState<'users' | 'vehicles'>('users'); 

    return (
        <div className="flex flex-col items-center gap-5">
            {/* Botones para cambiar entre áreas */}
            <div className="filters-container flex gap-4">
                <button 
                    className={`filter-button ${activeArea === 'users' ? 'filter-button-active' : ''}`} 
                    onClick={() => setActiveArea('users')}
                >
                    <img src={userIcon} alt="User Icon" className="h-15 w-15 rounded-full" />
                    Usuarios
                </button>
                <button 
                    className={`filter-button ${activeArea === 'vehicles' ? 'filter-button-active' : ''}`} 
                    onClick={() => setActiveArea('vehicles')}
                >
                    <img src={truckIcon} alt="Truck Icon" className="h-15 w-15 rounded-full" />
                    Vehículos
                </button>
            </div>

            {/* Contenedor con animación */}
            <div className="relative w-full max-w-4xl h-96 overflow-hidden">
                <AnimatePresence mode="wait">
                    {activeArea === "users" && (
                        <motion.div
                            key="users"
                            initial={{ x: -100, opacity: 0 }} // Aparece desde la izquierda
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -100, opacity: 0 }} // Desaparece hacia la izquierda
                            transition={{ duration: 0.5 }}
                            className="absolute w-full h-full"
                        >
                            <UsersArea />
                        </motion.div>
                    )}
                    
                    {activeArea === "vehicles" && (
                        <motion.div
                            key="vehicles"
                            initial={{ x: 100, opacity: 0 }} // Aparece desde la derecha
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 100, opacity: 0 }} // Desaparece hacia la derecha
                            transition={{ duration: 0.5 }}
                            className="absolute w-full h-full"
                        >
                            <VehiclesArea />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default AdminPage;