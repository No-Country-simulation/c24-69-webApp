import blockIcon from "../../../assets/block-icon.png";
import checkIcon from "../../../assets/check-icon.png";
import { IVehicles, IVehicleFilters } from "../../../types/Vehicles/interfaceVehicle";
import VehiclesFilters from "./VehiclesFilters";


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
      const stateMatch = !filters.state || filters.state === 'all' || vehicle.state === filters.state;
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

return (
    <div>
        <table className='w-full'>
        <thead className='tableHeader flex flex-row justify-around'>
        <tr>
            <th className='text-center w-36'>Marca</th>
            <th className='text-center w-36'>Modelo</th>
            <th className='text-center w-36'>Patente</th>
            <th className='text-center w-36'>Estado</th>
            <th className='text-center w-36'>Acción</th>
        </tr>
        </thead>
        <VehiclesFilters onFilter={onFilter} />
        <tbody className="tableBody flex flex-col gap-2">
        {filteredVehicles.map(vehicle => (
            <tr className="flex flex-row justify-around" key={vehicle.id}>
            <td className='text-center w-36'>{vehicle.marca}</td>
            <td className='text-center w-36'>{vehicle.modelo}</td>
            <td className='text-center w-36'>{vehicle.patente}</td>
            <td className='text-center w-36'>{vehicle.state ? 'approved' : 'disapproved'}</td>
            <td className="text-center w-36">
                {vehicle.state ? (
                <button
                    className=""
                    onClick={() => onDisapproveVehicle(vehicle.id)}
                >
                    <img src={blockIcon} alt="Deactivate Icon" className="h-5 w-5"/>
                </button>
                ) : (
                <button
                    className=""
                    onClick={() => onReapproveVehicle(vehicle.id)}
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

export default VehiclesList;