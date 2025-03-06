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
    <section className='grid grid-cols-3 gap-4 justify-center max-w-6xl m-auto'>
        <select name="name" value={filters.name} className='select-input' onChange={handleFilterChange}>
          <option value="">Ordenar por Nombre</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
        <select name="role" value={filters.role} className='select-input' onChange={handleFilterChange}>
          <option value="">Seleccionar Rol</option>
          <option value="user">Operarios</option>
          <option value="organizer">Encargados</option>
        </select>
        <select name="state" value={filters.state} className='select-input' onChange={handleFilterChange}>
          <option value="all">Todos</option>
          <option value="active">Activos</option>
          <option value="inactive">Inactivos</option>
        </select>
    </section>
  );
};

export default UserFilters;