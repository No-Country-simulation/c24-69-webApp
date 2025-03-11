import React, { useState, useEffect, useMemo } from 'react';
import UsersList from './UsersList';
import ConfirmModal from '../../ConfirmModal';
import { IUser, IUserFilters } from "../../../types/Users/interfaceUser";
import { banUser, fetchUsers, reactivateUser } from '../../../services/fetchUsers';
import UsersPie from './UsersPie';
import list from "../../../assets/list-icon.png";
import stats from "../../../assets/stats-icon.png";
// import animation from "../../../assets/404-animation.json";
// import Lottie from 'lottie-react';

const UsersArea: React.FC = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [filters, setFilters] = useState<IUserFilters>({ nombre: 'asc', rol: '', isActive: 'all' });
    const [view, setView] = useState<"list" | "pie">("list");

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
    const loadUsers = async () => {
        try {
            const allUsers = await fetchUsers();
            setUsers(allUsers.filter((user: { rol: string; }) => user.rol !== 'admin')); // Filtra admin al cargar
        } catch (error) {
            console.error("Error al presentar usuarios: ", error);
        }
    };

    loadUsers();
}, []); // 🔥 Se ejecuta solo una vez

const filteredUsers = useMemo(() => {
    return users
        .filter(user => 
            filters.isActive === 'all' || 
            (user.isActive) || 
            (!user.isActive))
        .filter(user => filters.rol === '' || user.rol === filters.rol)
        .sort((a, b) => filters.nombre === 'asc' ? a.nombre.localeCompare(b.nombre) : b.nombre.localeCompare(a.nombre));
}, [users, filters]); // 🔥 Solo recalcula cuando cambia `users` o `filters`

const handleModalClose = () => {
    setModalData((prev) => ({ ...prev, show: false }));
};

const updateUserState = async (id: string, isActive: boolean) => {
    try {
        if (isActive) {
            await reactivateUser(id);
        } else {
            await banUser(id);
        }
        setModalData({
            show: true,
            title: isActive ? "Restaurar Usuario" : "Banear Usuario",
            message: isActive ? "El usuario ha sido restaurado exitosamente." : "Usuario baneado exitosamente.",
            isSuccess: true,
            singleButton: true
        });

        setUsers(users.map(user => user.id === id ? { ...user, state: isActive } : user));
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        setModalData({
            show: true,
            title: "Error",
            message: isActive ? "Restauración de usuario fallida." : "Error al banear usuario.",
            isSuccess: false
        });
    }
};

const handleBanUser = (id: string) => {
    setModalData({
        show: true,
        title: "Confirmar Acción",
        message: "¿Estás seguro de realizar esta acción?",
        isSuccess: false,
        singleButton: false,
        onConfirm: () => updateUserState(id, false),
    });
};

const handleReactivateUser = (id: string) => {
    setModalData({
        show: true,
        title: "Confirmar Acción",
        message: "¿Estás seguro de restaurar al usuario?",
        isSuccess: false,
        singleButton: false,
        onConfirm: () => updateUserState(id, true),
    });
};
    
const activeUsers = useMemo(() => filteredUsers.filter(user => user.isActive).length, [filteredUsers]);
const inactiveUsers = useMemo(() => filteredUsers.filter(user => !user.isActive).length, [filteredUsers]);

// if (users.length === 0) {
//     return (
//         <div className='banner-container'>
//             <div className='banner-child-container'>
//                 <div className='text-banner-area'>
//             <h1 className='title text-center'>¡Algo salió mal!</h1>
//             <p className='text-active text-center'>No hay usuarios registrados o activos aún...</p>
//                 </div>
//             <div>
//             <Lottie 
//                     animationData={animation} 
//                     loop 
//                     className="animation-404" 
//                 />            </div>
//             </div>
//         </div>
//     );
// }

return (
    <div className='max-w-6xl m-auto'>
        {/* Botones de Vista */}
        <div className="flex flex-row justify-center gap-4 mb-4">
            <button className={`view-button ${view === "list" && "view-button-active"}`} onClick={() => setView('list')}>
                <span className="bg-span"></span>
                <img src={list} alt="List Icon" className='icon' />
                <span className='view-text'>Lista</span>
            </button>
            <button className={`view-button ${view === "pie" && "view-button-active"}`} onClick={() => setView('pie')}>
                <span className="bg-span"></span>
                <img src={stats} alt="Stats Icon" className='icon'/>
                <span className='view-text'>Gráficos</span>
            </button>
        </div>

        {/* Render de Vista */}
        {view === 'list' && (
            <UsersList
                users={filteredUsers}
                filters={filters}
                onFilter={setFilters}
                onDeactivateUser={handleBanUser}
                onReactivateUser={handleReactivateUser}
            />
        )}

        {view === 'pie' && (
            <div className='max-w-6xl m-auto'>
                <UsersPie activeUsers={activeUsers} inactiveUsers={inactiveUsers} />
            </div>
        )}

        {/* Modal de Confirmación */}
        <ConfirmModal
            show={modalData.show}
            title={modalData.title}
            message={modalData.message}
            onConfirm={handleModalClose}
            singleButton={true}
        />
    </div>
);
}

export default UsersArea;