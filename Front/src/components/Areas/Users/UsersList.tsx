import blockIcon from "../../../assets/block-icon.png";
import checkIcon from "../../../assets/check-icon.png";
import { IUser, IUserFilters } from "../../../types/Users/interfaceUser";
import UserFilters from "./UsersFilters";


interface UsersListProps {
    users: IUser[];
    filters: IUserFilters;
    onFilter: (filters: IUserFilters) => void;
    onDeactivateUser: (id: string) => void;
    onReactivateUser: (id: string) => void;
}

const UsersList: React.FC<UsersListProps> = ({users, filters, onFilter, onDeactivateUser, onReactivateUser}) => {
    const filteredUsers = users.filter(user => {
        const stateMatch =
        filters.state === 'all' || // Muestra todos los usuarios
        (filters.state === 'active' && user.state) || // Muestra solo usuarios activos
        (filters.state === 'inactive' && !user.state); // Muestra solo usuarios inactivos

        const roleMatch = filters.role === '' || user.role === filters.role;

        return stateMatch && roleMatch;
    })

    .sort((a, b) => {
        if (filters.name === 'asc') {
        return a.name.localeCompare(b.name);
        } else if (filters.name === 'desc') {
        return b.name.localeCompare(a.name);
        }
        return 0;
    });

return (
    <div>
        <UserFilters onFilter={onFilter} />
        <table className='table'>
        <thead className='table-header'>
        <th className='table-head'>Nickname</th>
        <th className='table-head-b'>Role</th>
        <th className='table-head-b'>State</th>
        <th className='table-head-b'>Ban User</th>
        </thead>
        <tbody className="tableBody flex flex-col gap-2">
        {filteredUsers.map(user => (
            <tr className="flex flex-row justify-around" key={user.id}>
            <td className='text-center w-36'>{user.name}</td>
            <td className='table-data-b'>{user.role}</td>
            <td className='table-data-b'>{user.state ? 'Active' : 'Inactive'}</td>
            <td className="table-data-b">
                {user.state ? (
                <button
                    className=""
                    onClick={() => onDeactivateUser(user.id)}
                >
                    <img src={blockIcon} alt="Deactivate Icon" className="h-5 w-5"/>
                </button>
                ) : (
                <button
                    className=""
                    onClick={() => onReactivateUser(user.id)}
                >
                    <img src={checkIcon} alt="Reactivate Icon" />
                </button>
                )}
            </td>
            </tr>
        ))}
        </tbody>
    </table>
    </div>
)
}

export default UsersList;