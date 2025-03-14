import React, { useEffect, useState } from "react";
import { IUserFilters } from "../../../../types/Users/interfaceUser";

interface UserFiltersProps {
  onFilter: (filters: IUserFilters) => void;
  resetPage: () => void; // Nueva prop para resetear la paginación
}

const UserFilters: React.FC<UserFiltersProps> = ({ onFilter, resetPage }) => {
  const [filters, setFilters] = useState<IUserFilters>({
    sortOrder: "asc", // Cambiado de "nombre" a "sortOrder" con valor inicial "asc"
    rol: "",
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedFilters: IUserFilters = {
      ...filters,
      [name]: value,
    };
    setFilters(updatedFilters);
    onFilter(updatedFilters); // Pasa los filtros actualizados
    resetPage(); // Reinicia la paginación
  };

  useEffect(() => {
    console.log("Filtros actualizados:", filters);
  }, [filters]);

  return (
    <section className="grid grid-cols-2 gap-4 justify-center max-w-6xl m-auto w-2/3">
      <select
        name="sortOrder"
        value={filters.sortOrder}
        className="select-input"
        onChange={handleFilterChange}
      >
        <option value="asc">A-Z</option>
        <option value="desc">Z-A</option>
      </select>
      <select
        name="rol"
        value={filters.rol}
        className="select-input"
        onChange={handleFilterChange}
      >
        <option value="">Seleccionar Rol</option>
        <option value="operario">Operarios</option>
        <option value="encargado">Encargados</option>
      </select>
    </section>
  );
};

export default UserFilters;