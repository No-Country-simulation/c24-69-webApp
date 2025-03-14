import React, { useState, useEffect, useMemo } from 'react';
import UsersList from './UsersList';
import ConfirmModal from '../../../ConfirmModal';
import { IUser, IUserFilters } from "../../../../types/Users/interfaceUser";
import { fetchUsers, updateUser  } from '../../../../services/fetchUsers';
import UsersPie from './UsersPie';
import list from "../../../../assets/list-icon.png";
import pieIcon from "../../../../assets/pie-icon.png";
import { AnimatePresence, motion } from 'framer-motion';
// import animation from "../../../assets/404-animation.json";
// import Lottie from 'lottie-react';

const UsersArea: React.FC = () => {
    const [users, setUsers] = useState<IUser []>([]);
    const [filters, setFilters] = useState<IUserFilters>({ nombre: 'asc', rol: ''});
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [activeArea, setActiveArea] = useState<'list' | 'pie'>('list'); 
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

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
                setLoading(true);
                setError(null);
                const { data, meta } = await fetchUsers(currentPage); // Obtener usuarios y metadata
                setUsers(data.filter((user: { rol: string; }) => user.rol !== 'admin'));
                setTotalPages(meta.totalPages); // Establecer total de páginas
            } catch (error) {
                setError("Error al cargar los usuarios. Intenta nuevamente.");
                console.error("Error al presentar usuarios: ", error);
            } finally {
                setLoading(false);
            }
        };
        loadUsers();
    }, [currentPage]); // Cargar usuarios cuando cambie la página

    const filteredUsers = useMemo(() => {
        return users
            .filter(user => filters.rol === '' || user.rol === filters.rol)
            .sort((a, b) => filters.nombre === 'asc' ? a.nombre.localeCompare(b.nombre) : b.nombre.localeCompare(a.nombre));
    }, [users, filters]); // 🔥 Solo recalcula cuando cambia `users` o `filters`

const handleModalClose = () => {
    setModalData((prev) => ({ ...prev, show: false }));
};

const updateUserState = async (id: string, rol: string) => {
    try {
        await updateUser(id, {rol}); // Enviar el nuevo rol al backend
        setModalData({
            show: true,
            title: "Rol Asignado",
            message: "Nuevo rol asignado al usuario exitosamente.",
            isSuccess: true,
            singleButton: true
        });

        setUsers(users.map(user => user.id === id ? { ...user, rol } : user)); // Asegurar que `rol` se actualiza
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        setModalData({
            show: true,
            title: "Error",
            message: "Error al asignar nuevo rol al usuario. Intente nuevamente",
            isSuccess: false
        });
    }
};

const confirmUpdate = (id: string, rol:string) => {
    setModalData({
        show: true,
        title: "Confirmar Acción",
        message: "¿Estás seguro de asignarle este rol al usuario?",
        isSuccess: false,
        singleButton: false,
        onConfirm: () => updateUserState(id, rol),
        onCancel: handleModalClose,
    });
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
        return activeArea === 'pie' ? 'view-button-active' : '';
    })()}`} 
    onClick={() => setActiveArea('pie')}
>
                <span className="bg-span"></span>
                <img src={pieIcon} alt="Graphs Icon" className='icon'/>
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
            {loading && <p className='title text-center mb-4'>Cargando usuarios...</p>}
            {error && <p className='error-text'>{error}</p>}
            <div className='loader'></div>
        </motion.div>
    )}
</AnimatePresence>

        {/* Render de Vista */}
        <AnimatePresence mode="wait">
    {activeArea === "list" && (
        <motion.div
            key="list"
            initial={{ x: -100, opacity: 0 }} // Aparece desde la izquierda
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }} // Desaparece hacia la derecha
            transition={{ duration: 0.5 }}
            className="max-w-6xl w-full m-auto"
        >
            <UsersList
                users={filteredUsers}
                filters={filters}
                onFilter={setFilters}
                changeRole={confirmUpdate}
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
            />
        </motion.div>
    )}

    {activeArea === "pie" && (
        <motion.div
            key="pie"
            initial={{ x: 100, opacity: 0 }} // Aparece desde la derecha
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }} // Desaparece hacia la izquierda
            transition={{ duration: 0.5 }}
            className="max-w-6xl m-auto"
        >
            <UsersPie />
        </motion.div>
    )}
</AnimatePresence>
        {/* Modal de Confirmación */}
        <ConfirmModal
            show={modalData.show}
            title={modalData.title}
            message={modalData.message}
            onConfirm={handleModalClose}
            onCancel={handleModalClose}
            singleButton={modalData.singleButton}
        />
    </section>
);
}

export default UsersArea;