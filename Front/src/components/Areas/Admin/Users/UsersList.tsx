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
    currentPage: number;
    totalPages: number;
    setCurrentPage: (page: number) => void;
}

const UsersList: React.FC<UsersListProps> = ({ users, filters, onFilter, onDeactivateUser , onReactivateUser , currentPage, totalPages, setCurrentPage }) => {
    const itemsPerPage = 10;

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

    const { paginatedData } = usePagination(filteredUsers, itemsPerPage);

    return (
        <div>
            <UserFilters onFilter={onFilter} />
            <table className='table'>
                <thead >
                    <tr>
                        <th className='table-head'>Nombre</th>
                        <th className='table-head-b'>Rol</th>
                        <th className='table-head-b'>Estado</th>
                        <th className='table-head-b'>Banear Usuario</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map(user => (
                        <tr key={user.id}>
                            <td className='table-data'>{user.nombre}</td>
                            <td className='table-data-b'>{user.rol}</td>
                            <td className='table-data-b'>{user.isActive ? 'Activo' : 'Baneado'}</td>
                            <td className="table-data-b">
                                {user.isActive ? (
                                    <button onClick={() => onDeactivateUser (user.id)}>
                                        <img src={blockIcon} alt="Deactivate Icon" className="h-14 w-14 m-auto" />
                                    </button>
                                ) : (
                                    <button onClick={() => onReactivateUser (user.id)}>
                                        <img src={checkIcon} alt="Reactivate Icon" className="w-14 h-14 m-auto" />
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
                nextPage={() => setCurrentPage(currentPage + 1)}
                prevPage={() => setCurrentPage(currentPage - 1)}
                setCurrentPage={setCurrentPage}
            />
        </div>
    );
};

export default UsersList;