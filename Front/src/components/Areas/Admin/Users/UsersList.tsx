import blockIcon from "../../../../assets/block-icon.png";
import checkIcon from "../../../../assets/check-icon.png";
import { IUser, IUserFilters } from "../../../../types/Users/interfaceUser";
import UserFilters from "./UsersFilters";
import { usePagination } from "../../../../hooks/usePagination";
import Pagination from "../../../Pagination/index";

interface UsersListProps {
    users: IUser[];
    filters: IUserFilters;
    onFilter: (filters: IUserFilters) => void;
    onDeactivateUser: (id: string) => void;
    onReactivateUser: (id: string) => void;
}

const UsersList: React.FC<UsersListProps> = ({ users, filters, onFilter, onDeactivateUser, onReactivateUser }) => {

    const filteredUsers = users
        .filter(user => {
            const stateMatch = filters.isActive === 'all' || user.isActive === filters.isActive;
            const roleMatch = filters.rol === '' || user.rol === filters.rol;
            return stateMatch && roleMatch;
        })
        .sort((a, b) => {
            if (filters.nombre === 'asc') {
                return a.nombre.localeCompare(b.nombre);
            } else if (filters.nombre === 'desc') {
                return b.nombre.localeCompare(a.nombre);
            }
            return 0;
        });

    const itemsPerPage = 10;
    const { paginatedData, currentPage, totalPages, nextPage, prevPage, setCurrentPage } =
        usePagination(filteredUsers, itemsPerPage);

    return (
        <div>
            <UserFilters onFilter={onFilter} />
            <table className='table'>
                <thead className='table-header'>
                    <tr>
                        <th className='table-head'>Nombre</th>
                        <th className='table-head-b'>Rol</th>
                        <th className='table-head-b'>Estado</th>
                        <th className='table-head-b'>Banear Usuario</th>
                    </tr>
                </thead>
                <tbody className="flex flex-col gap-2">
                    {paginatedData.map(user => (
                        <tr className="flex flex-row justify-around" key={user.id}>
                            <td className='text-center w-36'>{user.nombre}</td>
                            <td className='table-data-b'>{user.rol}</td>
                            <td className='table-data-b'>{user.isActive ? 'Activo' : 'Baneado'}</td>
                            <td className="table-data-b">
                                {user.isActive ? (
                                    <button onClick={() => onDeactivateUser(user.id)}>
                                        <img src={blockIcon} alt="Deactivate Icon" className="h-5 w-5" />
                                    </button>
                                ) : (
                                    <button onClick={() => onReactivateUser(user.id)}>
                                        <img src={checkIcon} alt="Reactivate Icon" />
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                nextPage={nextPage}
                prevPage={prevPage}
                setCurrentPage={setCurrentPage}
            />
        </div>
    );
};

export default UsersList;