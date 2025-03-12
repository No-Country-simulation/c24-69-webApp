import React, { useState } from 'react';
import { IUserFilters } from '../../../../types/Users/interfaceUser';

interface UserFiltersProps {
  onFilter: (filters: IUserFilters) => void;
}

const UserFilters: React.FC<UserFiltersProps> = ({ onFilter }) => {
  const [filters, setFilters] = useState<IUserFilters>({ 
    nombre: 'asc', 
    rol: '', 
    isActive: 'all' 
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    const updatedFilters: IUserFilters = {
      ...filters,
      [name]: name === 'isActive' 
        ? value === 'active' ? true 
          : value === 'inactive' ? false 
          : 'all'
        : value
    };

    setFilters(updatedFilters);
    onFilter(updatedFilters);
  };

  return (
    <section className='grid grid-cols-3 gap-4 justify-center max-w-6xl m-auto'>
      <select name="nombre" value={filters.nombre} className='select-input' onChange={handleFilterChange}>
        <option value="">Ordenar por Nombre</option>
        <option value="asc">A-Z</option>
        <option value="desc">Z-A</option>
      </select>
      <select name="rol" value={filters.rol} className='select-input' onChange={handleFilterChange}>
        <option value="">Seleccionar Rol</option>
        <option value="operario">Operarios</option>
        <option value="encargado">Encargados</option>
      </select>
      <select name="isActive" value={filters.isActive === 'all' ? 'all' : filters.isActive ? 'active' : 'inactive'} className='select-input' onChange={handleFilterChange}>
        <option value="all">Todos</option>
        <option value="active">Activos</option>
        <option value="inactive">Inactivos</option>
      </select>
    </section>
  );
};

export default UserFilters;