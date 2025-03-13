import {useState} from "react";
import { useAuth } from "../../hooks/UseAuth";
import InputCustom from "../InputCustom/InputCustom"
import ConfirmModal from "../ConfirmModal";
import { useNavigate } from "react-router-dom";


const LoginForm: React.FC = () => {
  const navigate = useNavigate();
    const { login, isLoading } = useAuth(); // ⬅ Usamos useAuth()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

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
      try {
        await login(email, password);
        setModalData({
          show: true,
          title: "Inicio de Sesión Exitoso",
          message: "Sesión iniciada. Será redirigido a la página de inicio.",
          isSuccess: true
      });
      setTimeout(() => {
        navigate("/");
    }, 3000);
      }catch{
        setModalData({
          show: true,
          title: "Error",
          message: "Ha ocurrido un error al iniciar sesión. Intente nuevamente.",
          isSuccess: false
      });
      }
    };
  
    return (
      <div className="max-w-md mx-auto mt-10 p-6 special-border rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
        <form className="text-sm" onSubmit={handleSubmit}>
          <InputCustom label="Correo Electrónico" type="email" value={email} onChange={setEmail} placeholder="Ingresa tu email" />
          <InputCustom label="Contraseña" type="password" value={password} onChange={setPassword} placeholder="Ingresa tu contraseña" />
          
          {/* Checkbox de Recordarme */}
          <InputCustom customStyle="custom-checkbox" label="Recordarme" type="checkbox" value="rememberMe" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
  
          <button type="submit" disabled={isLoading} className="filter-button-form w-full flex justify-center ">
            {isLoading ? "Cargando..." : "Iniciar Sesión"}
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

  export default LoginForm