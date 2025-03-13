import { useState } from "react";
import { useAuth } from "../../hooks/UseAuth";
import InputCustom from "../../components/InputCustom/InputCustom";
import ConfirmModal from "../ConfirmModal";
import { useNavigate } from "react-router-dom";

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const { register, isLoading } = useAuth();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [dni, setDni] = useState("");
  const [error, setError] = useState<string | null>(null);

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
    setError(null); // Limpiar errores previos

    try {
      await register(nombre, email, contraseña, dni);
      setModalData({
        show: true,
        title: "Registro Exitoso",
        message: "Usuario registrado exitosamente.",
        isSuccess: true,
        singleButton: true
    });
    setTimeout(() => {
      navigate("/");
  }, 3000);
    } catch {
      setError("Error al registrar usuario. Inténtalo de nuevo.");
      setModalData({
        show: true,
        title: "Error",
        message: "Error al registrar usuario. Inténtalo de nuevo.",
        isSuccess: false
    });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 special-border rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-4">Registro</h2>
      {error && <p className="text-red-500">{error}</p>} {/* Mostramos error si existe */}
      <form className="text-sm" onSubmit={handleSubmit}>
        <InputCustom label="Nombre" type="text" value={nombre} onChange={setNombre} placeholder="Ingresa tu nombre" />
        <InputCustom label="Correo Electrónico" type="email" value={email} onChange={setEmail} placeholder="Ingresa tu email" />
        <InputCustom label="Contraseña" type="password" value={contraseña} onChange={setContraseña} placeholder="Ingresa tu contraseña" />
        <InputCustom label="DNI" type="text" value={dni} onChange={setDni} placeholder="Ingresa tu DNI" />

        <button type="submit" disabled={isLoading} className="filter-button w-full flex justify-center">
          {isLoading ? "Registrando..." : "Registrarse"}
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
  );
};

export default RegisterForm;
