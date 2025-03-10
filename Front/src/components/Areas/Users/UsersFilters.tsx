import React, { useState } from 'react';
import { IUserFilters } from '../../../types/Users/interfaceUser';

interface UserFiltersProps {
  onFilter: (filters: IUserFilters) => void;
}

const UserFilters: React.FC<UserFiltersProps> = ({ onFilter }) => {
  const [filters, setFilters] = useState<IUserFilters>({ 
    name: '', 
    role: '', 
    state: 'all' 
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const filterValue = name === 'state'
        ? value === 'active'
        ? 'active'
        : value === 'inactive'
        ? 'inactive'
        : 'all'
        : name === 'role'
        ? value
        : value;

    const updatedFilters = {
    ...filters,
    [name]: filterValue
    };
    setFilters(updatedFilters);
    onFilter(updatedFilters);
};

  return (
    <tr className='flex flex-row justify-around mb-4'>
      <td className='text-center w-36'>
        <select name="nickname" value={filters.name} className='filter' onChange={handleFilterChange}>
          <option value="">Sort by Nickname</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
      </td>
      <td className='text-center w-36'>
        <select name="role" value={filters.role} className='filter' onChange={handleFilterChange}>
          <option value="">Select Role</option>
          <option value="user">User</option>
          <option value="organizer">Organizer</option>
        </select>
      </td>
      <td className='text-center w-36'>
        <select name="state" value={filters.state} className='filter' onChange={handleFilterChange}>
          <option value="all">All Users</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </td>
      <td className='text-center text-white w-36'>Ban / Reactivate</td>
    </tr>
  );
};

export default UserFilters;