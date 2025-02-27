import React, { useState, useEffect } from 'react';
import UsersList from './UsersList';
import ConfirmModal from '../../ConfirmModal';
import { IUser, IUserFilters } from "../../../types/Users/interfaceUser";
import { banUser, fetchUsers, reactivateUser } from '../../../services/fetchUsers';
import UsersPie from './UsersPie';
import animation from "../../../assets/404-animation.json";
import Lottie from 'lottie-react';


const UsersArea: React.FC = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [filters, setFilters] = useState<IUserFilters>({ name: '', role: '', state: 'all' });
    const [userToBan, setUserToBan] = useState<string | null>(null);
    const [userToReactivate, setUserToReactivate] = useState<string | null>(null);
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
    const filteredUsers = allUsers
    .filter((user: { role: string; }) => user.role !== 'admin')
    .filter((user: { state: boolean; }) => {
    const stateMatch =
    filters.state === 'all' || // Muestra todos los usuarios
    (filters.state === 'active' && user.state) || // Muestra solo usuarios activos
    (filters.state === 'inactive' && !user.state); // Muestra solo usuarios inactivos
    return stateMatch;
    })
    .filter((user: { role: string; tournaments: string[]; }) => 
    (filters.role === '' || user.role === filters.role))
    .sort((a: { name: string; }, b: { name: string; }) => {
    if (filters.name === 'asc') {
    return a.name.localeCompare(b.name);
    } else if (filters.name === 'desc') {
    return b.name.localeCompare(a.name);
    } else {
    return 0;
    }
    });
    
    setUsers(filteredUsers);
    } catch (error) {
    console.error("Error fetching users:", error);
    }
    };
    
    loadUsers();
}, [filters]);
    
const handleFilter = (newFilters: IUserFilters) => {
    setFilters(newFilters);
};

const handleModalClose = () => {
    setModalData((prev) => ({ ...prev, show: false }));
};

const handleBanUser = (id: string) => {
    setUserToBan(id);
    setModalData({
        show: true,
        title: "Confirm Ban User",
        message: "Are you sure you want to ban this user?",
        isSuccess: false,
        singleButton: false,
        onConfirm: confirmBanUser,
    });
};

const confirmBanUser = async () => {
    if (userToBan) {
    try {
    await banUser(userToBan);
    setModalData({
        show: true,
        title: "User Banned",
        message: "User Banned Successfully",
        isSuccess: true,
        singleButton: true,
    });
    
    setUsers(users.map(user => user.id === userToBan ? { ...user, state: false } : user));
    } catch (error) {
    console.error("Error banning user:", error);
    setModalData({
        show: true,
        title: "Error",
        message: "Failed to ban user.",
        isSuccess: false,
        });    
    }
}};
    
const handleReactiveUser = (id: string) => {
    setUserToReactivate(id);
    setModalData({
        show: true,
        title: "User Banned",
        message: "User Banned Successfully",
        isSuccess: false,
        singleButton: false,
        onConfirm: confirmReactivateUser,
})};

const confirmReactivateUser = async () => {
    if (userToReactivate) {
    try {
    await reactivateUser(userToReactivate); // Envia el id del user
    alert("User Reactivated Successfully");
    setUsers(users.map(user => user.id === userToReactivate ? { ...user, state: true } : user));
    } catch (error) {
    console.error("Error reactivating user:", error);
    setModalData({
        show: true,
        title: "Error",
        message: "Failed to reactivate user.",
        isSuccess: false,
        });    
}}};
    
const [view, setView] = useState<string>('table');
    
const activeUsers = users.filter(user => user.state).length;
const inactiveUsers = users.filter(user => !user.state).length;
    
const handleChangeView = (view: string) => {
    setView(view);
};

if (users.length === 0) {
    return (
        <div className='banner-container'>
            <div className='banner-child-container'>
                <div className='text-banner-area'>
            <h1 className='title text-center'>¡Algo salió mal!</h1>
            <p className='text-active text-center'>No hay usuarios registrados o activos aún...</p>
                </div>
            <div>
            <Lottie 
                    animationData={animation} 
                    loop 
                    className="animation-404" 
                />            </div>
            </div>
        </div>
    );
}

return(
    <div>
    <div className="flex flex-row items-center gap-4 mt-4">
    <button className={`buttonFilter ${view === "table" && "buttonFilterActive"}`} onClick={() => handleChangeView('table')}>Table</button>
    <button className={`buttonFilter ${view === "pie" && "buttonFilterActive"}`} onClick={() => handleChangeView('pie')}>Graphs</button>
    </div>
    {view === 'table' && (
    <div className='col-span-3'>
    <UsersList
    users={users}
    filters={filters}
    onFilter={handleFilter}
    onDeactivateUser={handleBanUser}
    onReactivateUser={handleReactiveUser}
    />
    </div>
    )}
    {view === 'pie' && (
    <div className='col-span-3'>
    <UsersPie
    activeUsers={activeUsers}
    inactiveUsers={inactiveUsers}
    />
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
}

export default UsersArea;