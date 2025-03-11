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
                    <img src={userIcon} alt="User Icon"/>
                    Usuarios
                </button>
                <button 
                    className={`filter-button ${activeArea === 'vehicles' ? 'filter-button-active' : ''}`} 
                    onClick={() => setActiveArea('vehicles')}
                >
                    <img src={truckIcon} alt="Truck Icon" />
                    Vehículos
                </button>
            </div>

            {/* Contenedor con animación */}
            <section className="flex justify-center w-full max-w-6xl h-full overflow-hidden">
                <AnimatePresence mode="wait">
                    {activeArea === "users" && (
                        <motion.div
                            key="users"
                            initial={{ x: -100, opacity: 0 }} // Aparece desde la izquierda
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -100, opacity: 0 }} // Desaparece hacia la izquierda
                            transition={{ duration: 0.5 }}
                            className="w-full max-w-6xl mb-8"
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
                            className="w-full max-w-6xl mb-8"
                        >
                            <VehiclesArea />
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>
        </div>
    );
}

export default AdminPage;