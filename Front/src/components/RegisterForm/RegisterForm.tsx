import { useState } from "react";
import { useAuth } from "../../hooks/UseAuth";
import InputCustom from "../../components/InputCustom/InputCustom";

const RegisterForm: React.FC = () => {
  const { register, isLoading } = useAuth();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dni, setDni] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Limpiar errores previos

    try {
      await register(nombre, email, password, dni);
    } catch (err) {
      setError("Error al registrar usuario. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 special-border rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-4">Registro</h2>
      {error && <p className="text-red-500">{error}</p>} {/* Mostramos error si existe */}
      <form className="text-sm" onSubmit={handleSubmit}>
        <InputCustom label="Nombre" type="text" value={nombre} onChange={setNombre} placeholder="Ingresa tu nombre" />
        <InputCustom label="Correo Electrónico" type="email" value={email} onChange={setEmail} placeholder="Ingresa tu email" />
        <InputCustom label="Contraseña" type="password" value={password} onChange={setPassword} placeholder="Ingresa tu contraseña" />
        <InputCustom label="DNI" type="text" value={dni} onChange={setDni} placeholder="Ingresa tu DNI" />

        <button type="submit" disabled={isLoading} className="filter-button w-full flex justify-center">
          {isLoading ? "Registrando..." : "Registrarse"}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
