import React, { useEffect, useState } from 'react';
import { IVehicleFilters } from '../../../../types/Vehicles/interfaceVehicle';

interface VehicleFiltersProps {
  onFilter: (filters: IVehicleFilters) => void;
}

const VehicleFilters: React.FC<VehicleFiltersProps> = ({ onFilter }) => {
    const [filters, setFilters] = useState<IVehicleFilters>({
        marca: '',
        modelo: '',
        patente: '',
        status: null,
    });

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
      const { name, value } = e.target;
  
      const parsedValue: boolean | null = value === "" ? null : value === "approved" ? true : false;
  
      setFilters(prevFilters => {
          const updatedFilters = { 
              ...prevFilters, 
              [name]: name === "status" ? parsedValue : value 
          } as IVehicleFilters;
          onFilter(updatedFilters);
          return updatedFilters;
      });
  };
  

useEffect(() => {
    onFilter(filters);  // Llama a onFilter solo cuando filters cambia
  }, [filters, onFilter]);  // Solo se ejecuta cuando filters cambia


  return (
<section className='grid grid-cols-4 gap-4 justify-center max-w-6xl m-auto'>

{/* Ordenar por Marca */}
<select name="marca" value={filters.marca} className='select-input' onChange={handleFilterChange}>
    <option value="">Ordenar Marca</option>
    <option value="asc">A-Z</option>
    <option value="desc">Z-A</option>
</select>

{/* Ordenar por Modelo */}
<select name="modelo" value={filters.modelo} className='select-input' onChange={handleFilterChange}>
    <option value="">Ordenar Modelo</option>
    <option value="asc">A-Z</option>
    <option value="desc">Z-A</option>
</select>

{/* Filtrar por Estado */}
<select name="status" value={filters.status === null ? "" : filters.status ? "approved" : "disapproved"} className='select-input' onChange={handleFilterChange}>
  <option value="">Todos</option>
  <option value="approved">Aprobados</option>
  <option value="disapproved">Desaprobados</option>
</select>

{/* Buscar por Patente */}
  <input 
    type="text" 
    name="patente" 
    value={filters.patente} 
    className='search-input' 
    onChange={handleFilterChange}
    placeholder="Buscar Patente"
  />

</section>
  );
};

export default VehicleFilters;