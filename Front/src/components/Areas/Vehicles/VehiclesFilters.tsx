import React, { useEffect, useState } from 'react';
import { IVehicleFilters } from '../../../types/Vehicles/interfaceVehicle';

interface VehicleFiltersProps {
  onFilter: (filters: IVehicleFilters) => void;
}

const VehicleFilters: React.FC<VehicleFiltersProps> = ({ onFilter }) => {
    const [filters, setFilters] = useState<IVehicleFilters>({
        marca: '',
        modelo: '',
        patente: '',
        state: 'all',
    });

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;

    setFilters(prevFilters => {
        const updatedFilters = { ...prevFilters, [name]: value } as IVehicleFilters;
        onFilter(updatedFilters);
        return updatedFilters;
    });
};

useEffect(() => {
    onFilter(filters);  // Llama a onFilter solo cuando filters cambia
  }, [filters, onFilter]);  // Solo se ejecuta cuando filters cambia


  return (
    <tr className='flex flex-row justify-around mb-4'>
      {/* Ordenar por Marca */}
      <td className='text-center w-36'>
        <select name="marca" value={filters.marca} className='filter' onChange={handleFilterChange}>
          <option value="">Ordenar Marca</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
      </td>

      {/* Ordenar por Modelo */}
      <td className='text-center w-36'>
        <select name="modelo" value={filters.modelo} className='filter' onChange={handleFilterChange}>
          <option value="">Ordenar Modelo</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
      </td>

      {/* Filtrar por Estado */}
      <td className='text-center w-36'>
        <select name="state" value={filters.state} className='filter' onChange={handleFilterChange}>
          <option value="">Todos</option>
          <option value="approved">Aprobados</option>
          <option value="disapproved">Desaprobados</option>
        </select>
      </td>

      {/* Buscar por Patente */}
      <td className='text-center w-36'>
        <input 
          type="text" 
          name="patente" 
          value={filters.patente} 
          className='filter' 
          onChange={handleFilterChange}
          placeholder="Buscar Patente"
        />
      </td>
    </tr>
  );
};

export default VehicleFilters;