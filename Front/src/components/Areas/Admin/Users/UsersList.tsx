import { IUser, IUserFilters } from "../../../../types/Users/interfaceUser";
import UserFilters from "./UsersFilters";
import { usePagination } from "../../../../hooks/usePagination";
import Pagination from "../../../Pagination/index";
import confirmIcon from "../../../../assets/check-icon.png";
import { useState } from "react";

interface UsersListProps {
    users: IUser[];
    filters: IUserFilters;
    onFilter: (filters: IUserFilters) => void;
    changeRole: (userId: string, userRol: string) => void;
    currentPage: number;
    totalPages: number;
    setCurrentPage: (page: number) => void;
}

const UsersList: React.FC<UsersListProps> = ({ users, filters, onFilter, changeRole, currentPage, totalPages, setCurrentPage }) => {
    const [newRole, setNewRole] = useState<string>('');
    const itemsPerPage = 10;

    const filteredUsers = users
        .filter(user => {
            const roleMatch = filters.rol === '' || user.rol === filters.rol;
            return roleMatch;
        })
        .sort((a, b) => {
            if (filters.nombre === 'asc') {
                return a.nombre.localeCompare(b.nombre);
            } else if (filters.nombre === 'desc') {
                return b.nombre.localeCompare(a.nombre);
            }
            return 0;
        });

    const { paginatedData } = usePagination(filteredUsers, itemsPerPage);

    return (
        <div>
            <UserFilters onFilter={onFilter} />
            <table className='table'>
                <thead >
                    <tr>
                        <th className='table-head'>Nombre</th>
                        <th className='table-head-b'>Rol</th>
                        <th className='table-head-b'>Asignar Rol</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map(user => (
                        <tr key={user.id}>
                            <td className='table-data'>{user.nombre}</td>
                            <td className='table-data-b'>{user.rol}</td>
                            <td className="table-data-input">
                        <select 
                            name="rol" 
                            defaultValue={user.rol} 
                            className='select-input' 
                            onChange={(e) => setNewRole(e.target.value)} // Guarda el nuevo rol seleccionado
                        >
                            <option value="">Seleccionar Rol</option>
                            <option value="operario">Operario</option>
                            <option value="encargado">Encargado</option>
                        </select>
                        <button type="submit" onClick={() => changeRole(user.id, newRole)} className="conf-button w-3/4 m-auto">
                            <img src={confirmIcon} alt="Confirm Icon" className="icon" />
                            Confirmar
                        </button>
                    </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                nextPage={() => setCurrentPage(currentPage + 1)}
                prevPage={() => setCurrentPage(currentPage - 1)}
                setCurrentPage={setCurrentPage}
            />
        </div>
    );
};

export default UsersList;