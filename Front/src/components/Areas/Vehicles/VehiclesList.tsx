import blockIcon from "../../../assets/block-icon.png";
import checkIcon from "../../../assets/check-icon.png";
import { IVehicles, IVehicleFilters } from "../../../types/Vehicles/interfaceVehicle";
import VehiclesFilters from "./VehiclesFilters";
import { usePagination } from "../../../hooks/usePagination";
import Pagination from "../../Pagination/index";


interface VehiclesListProps {
    vehicles: IVehicles[];
    filters: IVehicleFilters;
    onFilter: (filters: IVehicleFilters) => void;
    onDisapproveVehicle: (id: string) => void;
    onReapproveVehicle: (id: string) => void;
}

const VehiclesList: React.FC<VehiclesListProps> = ({vehicles, filters, onFilter, onDisapproveVehicle, onReapproveVehicle}) => {
    const filteredVehicles = vehicles
    .filter(vehicle => {
      const stateMatch = !filters.status || filters.status === null || vehicle.status === filters.status;
      const patenteMatch = !filters.patente || vehicle.patente.toLowerCase().includes(filters.patente.toLowerCase());
      return stateMatch && patenteMatch;
    })

    .sort((a, b) => {
        if (filters.marca) {
            const marcaCompare = filters.marca === 'asc' ? a.marca.localeCompare(b.marca) : b.marca.localeCompare(a.marca);
            if (marcaCompare !== 0) return marcaCompare;
        }
    
        if (filters.modelo) {
            return filters.modelo === 'asc' ? a.modelo.localeCompare(b.modelo) : b.modelo.localeCompare(a.modelo);
        }
        return 0;
    });

const itemsPerPage = 10;
const { paginatedData, currentPage, totalPages, nextPage, prevPage, setCurrentPage } =
  usePagination(filteredVehicles, itemsPerPage);

    return (
        <div>
            <VehiclesFilters onFilter={onFilter} /> {/* Mover filtros arriba de la tabla */}
            <table className='table'>
            <thead className="table-header">
            <tr>
                <th className='table-head'>Marca</th>
                <th className='table-head-b'>Modelo</th>
                <th className='table-head-b'>Patente</th>
                <th className='table-head-b'>Estado</th>
                <th className='table-head-b'>Acción</th>
            </tr>
            </thead>
            <tbody className="tableBody flex flex-col gap-2">
            {paginatedData.map(vehicle => (
                <tr className="flex flex-row justify-around" key={vehicle.id}>
                <td className='table-data'>{vehicle.marca}</td>
                <td className='table-data-b'>{vehicle.modelo}</td>
                <td className='table-data-b'>{vehicle.patente}</td>
                <td className='table-data-b'>{vehicle.status ? 'Aprobado' : 'Desaprobado'}</td>
                <td className="table-data-b">
                    {vehicle.status ? (
                    <button onClick={() => onDisapproveVehicle(vehicle.id)}>
                        <img src={blockIcon} alt="Deactivate Icon" className="h-5 w-5"/>
                    </button>
                    ) : (
                    <button onClick={() => onReapproveVehicle(vehicle.id)}>
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
}

export default VehiclesList;