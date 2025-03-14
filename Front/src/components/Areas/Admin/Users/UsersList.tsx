import { useMemo, useState } from "react";
import { IUser, IUserFilters } from "../../../../types/Users/interfaceUser";
import Pagination from "../../../Pagination";
import UserFilters from "./UsersFilters";
import confirmIcon from "../../../../assets/check-icon.png";

interface UsersListProps {
    users: IUser[];
    filters: IUserFilters;
    onFilter: React.Dispatch<React.SetStateAction<IUserFilters>>;
    changeRole: (id: number, rol: string) => void;  // id ahora es number
    currentPage: number;
    totalPages: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const UsersList: React.FC<UsersListProps> = ({ users, filters, onFilter, changeRole, currentPage, totalPages, setCurrentPage }) => {
    const { sortOrder, rol } = filters; // Desestructurando el filtro actual
    const [selectedRole, setSelectedRole] = useState<{ [key: number]: string }>({});
    
    // Filtrar y ordenar usuarios de forma optimizada
    const filteredUsers = useMemo(() => {
        let filtered = [...users];

        // Filtrar por rol
        if (rol) {
            filtered = filtered.filter(user => user.rol.includes(rol));
        }

        // Ordenar por nombre
        return filtered.sort((a, b) => 
            sortOrder === "asc" 
                ? a.nombre.localeCompare(b.nombre)
                : b.nombre.localeCompare(a.nombre)
        );
    }, [users, rol, sortOrder]);

    const handleSelectChange = (userId: number, newRole: string) => {
        setSelectedRole(prev => ({ ...prev, [userId]: newRole })); // Guarda el nuevo rol en el estado
    };

    const handleRoleChange = (userId: number, newRole: string) => {
        console.log(`Cambiando rol de usuario ${userId} a ${newRole}`);
        changeRole(userId, newRole);
    };

    return (
        <section>
            <UserFilters onFilter={onFilter} resetPage={() => setCurrentPage(1)} />
            
            {/* Tabla de Usuarios */}
            <div>
            <table className="table">
                <thead>
                    <tr>
                        <th className="table-head">Nombre</th>
                        <th className="table-head-b">Rol</th>
                        <th className="table-head-b">Cambiar Rol</th>
                        <th className="table-head-b">Confirmar</th>
                    </tr>
                </thead>
                <tbody>
                {filteredUsers.map(user => (
                    <tr key={user.id}>
                        <td className="table-data">{user.nombre}</td>
                        <td className="table-data-b">{user.rol}</td>
                        <td className="table-data-b">
                            <select
                                className="select-input"
                                value={selectedRole[user.id] || user.rol} 
                                onChange={(e) => handleSelectChange(user.id, e.target.value)}
                            >
                                <option value="">Selecciona un Rol</option>
                                <option value="encargado">Encargado</option>
                                <option value="operario">Operario</option>
                            </select>
                        </td>
                        <td className="table-data-b">
                        <button onClick={() => handleRoleChange(user.id, selectedRole[user.id] || user.rol[0])}>
                            <img src={confirmIcon} alt="Confirmar" />
                        </button>
                        </td>
                    </tr>
                ))}
            </tbody>
            </table>
            </div>

            {/* Paginación */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                nextPage={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                prevPage={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                setCurrentPage={setCurrentPage}
            />
        </section>
    );
};

export default UsersList;
