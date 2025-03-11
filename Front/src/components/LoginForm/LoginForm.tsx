import {useState} from "react";
import { useAuth } from "../../context/hooks/UseAuth";
import InputCustom from "../InputCustom/InputCustom"


const LoginForm: React.FC = () => {
    const { login, isLoading } = useAuth(); // ⬅ Usamos useAuth()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      await login(email, password);
    };
  
    return (
      <div className="max-w-md mx-auto mt-10 p-6 special-border rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
        <form className="text-sm" onSubmit={handleSubmit}>
          <InputCustom label="Correo Electrónico" type="email" value={email} onChange={setEmail} placeholder="Ingresa tu email" />
          <InputCustom label="Contraseña" type="password" value={password} onChange={setPassword} placeholder="Ingresa tu contraseña" />
          
          {/* Checkbox de Recordarme */}
          <InputCustom customStyle="custom-checkbox" label="Recordarme" type="checkbox" value="rememberMe" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
  
          <button type="submit" disabled={isLoading} className="filter-button w-full flex justify-center">
            {isLoading ? "Cargando..." : "Iniciar Sesión"}
          </button>
        </form>
      </div>
    );
  };

  export default LoginForm