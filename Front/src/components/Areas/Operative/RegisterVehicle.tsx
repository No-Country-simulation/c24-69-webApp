import { useState } from "react";
import { IVehicleCreate } from "../../../types/Vehicles/interfaceVehicle";
import ConfirmModal from "../../ConfirmModal";
import { createVehicle } from "../../../services/fetchVehicles";
import { useNavigate } from "react-router-dom";

const RegisterVehicle: React.FC = () => {
    const navigate = useNavigate();
    const [marca, setMarca] = useState("");
    const [modelo, setModelo] = useState("");
    const [patente, setPatente] = useState("");
    const [error, setError] = useState<string>("");
    const [modalData, setModalData] = useState<{
        show: boolean;
        title: string;
        message: string;
        isSuccess: boolean;
        onConfirm?: () => void;
        onCancel?: () => void;
        singleButton?: boolean;
    }>({
        show: false,
        title: "",
        message: "",
        isSuccess: false,
        singleButton: true
    });

const handleModalClose = () => {
    setModalData((prev) => ({ ...prev, show: false }));
};

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newVehicle: IVehicleCreate = { marca, modelo, patente };

    try {
        await createVehicle(newVehicle);
        setModalData({
            show: true,
            title: "Registro Exitoso",
            message: "Vehículo registrado exitosamente.",
            isSuccess: true,
            singleButton: true
        });

        setTimeout(() => navigate("/operative"), 3000);
    } catch (error) {
        setError(`Error al registrar vehículo: ${(error as Error).message}`);
        setModalData({
            show: true,
            title: "Error",
            message: "Error al registrar vehículo. Inténtalo de nuevo.",
            isSuccess: false
        });
    }
};

return (
    <section className="w-full max-w-6xl m-auto flex flex-col justify-center items-center">
    <div className="create-vehicle-banner">
<h2 className="text-2xl font-bold mb-4">Registro</h2>

    {error && <p className="text-red-500">{error}</p>} {/* Mostramos error si existe */}

<form className="create-vehicle-form" onSubmit={handleSubmit}>
        <label className="label-form">
            Marca
            <input 
                type="text" 
                value={marca} 
                onChange={(e) => setMarca(e.target.value)}
                placeholder="Ingresa la marca..." 
            />
        </label>

        <label className="label-form">
            Modelo
            <input 
                type="text" 
                value={modelo} 
                onChange={(e) => setModelo(e.target.value)}
                placeholder="Ingresa el modelo..." 
            />
        </label>

        <label className="label-form">
            Patente
            <input 
                type="text" 
                value={patente} 
                onChange={(e) => setPatente(e.target.value)}
                placeholder="Ingresa la patente..." 
            />
        </label>
        <button type="submit" className="conf-button">
          Registrar
        </button>
      </form>
      <ConfirmModal
            show={modalData.show}
            title={modalData.title}
            message={modalData.message}
            onConfirm={handleModalClose}
            singleButton={modalData.singleButton}
        />
</div>
    </section>
)
}

export default RegisterVehicle;