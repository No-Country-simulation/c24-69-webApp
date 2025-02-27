import React, { useState } from "react";
import UsersArea from "../../components/Areas/Users";
// import VehiclesArea from "../../components/Areas/Vehicles";
import userIcon from "../../assets/user-icon.png";
import truckIcon from "../../assets/truck-icon.png";

const AdminPage: React.FC = () => {
    // Estado para controlar qué área se muestra
    const [activeArea, setActiveArea] = useState<'users' | 'vehicles'>('users'); 

    return (
        <div>
            {/* Botones para cambiar entre áreas */}
            <div className="filters-container">
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
                    <img src={truckIcon} alt="User Icon" className="h-15 w-15 rounded-full" />
                    Vehículos
                </button>
            </div>

            {/* Condicionalmente mostrar las áreas */}
            {activeArea === 'users' && <UsersArea />}
            {/* {activeArea === 'vehicles' && <VehiclesArea />} */}
        </div>
    );
}

export default AdminPage;