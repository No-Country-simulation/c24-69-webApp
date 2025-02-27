import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import ThemeButton from "../../components/ThemeButton/index";
import ConfirmModal from "../../components/ConfirmModal/index";
import logo from "../../assets/logo1.png";
import "../../styles/buttons.css";

const NavBar: React.FC = () => {
  const location = useLocation(); // Obtiene la ruta actual
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [modalData] = useState<{
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
  });

  return (
  <nav className="nav-section">

  <div className="fix-container-left">
    <img src={logo} alt="Logo" className="logo" />
  </div>

  <div className="nav-links">
    <Link
    to="/"
    className={`nav-btn ${location.pathname === "/" ? "nav-btn-active" : ""}`}
    >
    Inicio
    </Link>
    <Link
    to="/signup"
    className={`nav-btn ${location.pathname === "/signup" ? "nav-btn-active" : ""}`}
    >
    Registrarse
    </Link>
    <Link
    to="/login"
    className={`nav-btn ${location.pathname === "/login" ? "nav-btn-active" : ""}`}
    >
    Iniciar Sesión
    </Link>
    <Link
    to="/about"
    className={`nav-btn ${location.pathname === "/about" ? "nav-btn-active" : ""}`}
    >
    Sobre Nos
    </Link>
  </div>

  <div className="fix-container-right relative">
    {/* Menú hamburguesa en móviles */}
    <div className="md:hidden flex items-center pr-4"> {/* Agregado 'pr-4' para espaciado */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="bg-amber-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>
    </div>
    <ThemeButton />
  </div>



      {/* Menú desplegable en móviles */}
      {isMenuOpen && (
        <div className="burger-menu">
          <Link to="/" className="block py-2 px-4 text-white" onClick={() => setIsMenuOpen(false)}>
            Inicio
          </Link>
          <Link to="/signup" className="block py-2 px-4 text-white" onClick={() => setIsMenuOpen(false)}>
            Registrarse
          </Link>
          <Link to="/login" className="block py-2 px-4 text-white" onClick={() => setIsMenuOpen(false)}>
            Iniciar Sesión
          </Link>
          <Link to="/about" className="block py-2 px-4 text-white" onClick={() => setIsMenuOpen(false)}>
            Sobre Nos
          </Link>
        </div>
      )}

      {/* Modal de confirmación */}
      <ConfirmModal
        show={modalData.show}
        title={modalData.title}
        message={modalData.message}
        onConfirm={modalData.onConfirm || (() => {})}
        onCancel={modalData.onCancel}
        singleButton={modalData.singleButton}
      />
    </nav>
  );
};

export default NavBar;