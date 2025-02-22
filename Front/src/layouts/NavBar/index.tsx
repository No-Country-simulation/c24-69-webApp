import { Link, useLocation } from "react-router-dom"; // Importa useLocation
import ThemeButton from "../../components/ThemeButton/index";
import ConfirmModal from "../../components/ConfirmModal/index";
import { useState } from "react";
import logo from "../../assets/logo1.png";
import "../../styles/buttons.css";

const NavBar: React.FC = () => {
  const location = useLocation(); // Obtiene la ruta actual

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
    <div>
      <div className="nav-container">
        <div className="nav-links-container">
          <div className="fix-container-left">
            <img src={logo} alt="Logo" className="logo" />
          </div>

          {/* Botón Home con clase activa si está en la ruta "/" */}
          <Link
            to="/"
            className={`nav-btn ${
              location.pathname === "/" ? "nav-btn-active" : ""
            }`}
          >
            Home
          </Link>
          <Link
            to="/signup"
            className={`nav-btn ${
              location.pathname === "/signup" ? "nav-btn-active" : ""
            }`}
          >
            Registrarse
          </Link>
          <Link
            to="/login"
            className={`nav-btn ${
              location.pathname === "/login" ? "nav-btn-active" : ""
            }`}
          >
            Iniciar Sesion
          </Link>
          <Link
            to="/about"
            className={`nav-btn ${
              location.pathname === "/about" ? "nav-btn-active" : ""
            }`}
          >
            About
          </Link>
        </div>
      </div>

      <div className="fix-container-right">
        <ThemeButton />
      </div>

      {/* Modal de confirmación */}
      <ConfirmModal
        show={modalData.show}
        title={modalData.title}
        message={modalData.message}
        onConfirm={modalData.onConfirm || (() => {})}
        onCancel={modalData.onCancel}
        singleButton={modalData.singleButton}
      />
    </div>
  );
};

export default NavBar;