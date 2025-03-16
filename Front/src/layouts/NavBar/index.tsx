import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import ThemeButton from "../../components/ThemeButton/index";
import ConfirmModal from "../../components/ConfirmModal/index";
import logo from "../../assets/logo1.png";
import "../../styles/buttons.css";
import { logoutService } from "../../context/ServiceAuth/AuthService";
import { useAuth } from "../../hooks/UseAuth"; 

const NavBar: React.FC = () => {
  const location = useLocation(); // Obtiene la ruta actual
  const { user } = useAuth(); // Obtén el usuario decodificado del token
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const confirmLogout = async () => {
    try {
      // Esperamos a que el usuario confirme el logout
      await logoutService(); // Eliminar el token de las cookies

      // Mostrar mensaje de éxito y redirigir
      setModalData({
        show: true,
        title: "Cierre de Sesión",
        message: "Cierre de sesión exitoso. Será redirigido al Inicio",
        isSuccess: true,
        singleButton: true,
      });

      // Después de un breve delay, redirigimos al inicio
      setTimeout(() => {
        window.location.href = "/";  // Redirigir al inicio
      }, 1500); 
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      setModalData({
        show: true,
        title: "Error",
        message: "Hubo un error al cerrar sesión. Intenta nuevamente.",
        isSuccess: false,
      });
    }
  };

  const handleLogout = () => {
    setModalData({
      show: true,
      title: "Confirmar Cierre",
      message: "¿Estás seguro de cerrar sesión?",
      isSuccess: false,
      singleButton: false,
      onConfirm: () => {
        // Primero cerramos el modal
        handleModalClose();
        // Luego ejecutamos el logout
        confirmLogout(); 
      },
      onCancel: handleModalClose,
    });
  };

  console.log(user);
  const userRole = user?.rol?.[0]?.toLowerCase(); // Tomamos el primer rol y lo convertimos a minúsculas

  const renderNavLinks = () => {
    if (userRole === "admin") {
      return (
        <>
          <Link to="/" className={`nav-btn ${location.pathname === "/" ? "nav-btn-active" : ""}`}>Inicio</Link>
          <Link to="/admin" className={`nav-btn ${location.pathname === "/admin" ? "nav-btn-active" : ""}`}>Admin</Link>
          <Link to="/signup" className={`nav-btn ${location.pathname === "/signup" ? "nav-btn-active" : ""}`}>Registrar Empleado</Link>
          <Link to="/" className={`nav-btn`} onClick={handleLogout}>Cerrar Sesión</Link>
          <Link to="/about" className={`nav-btn ${location.pathname === "/about" ? "nav-btn-active" : ""}`}>Nosotros</Link>
        </>
      );
    }
  
    if (userRole === "operario") {
      return (
        <>
          <Link to="/" className={`nav-btn ${location.pathname === "/" ? "nav-btn-active" : ""}`}>Inicio</Link>
          <Link to="/operative" className={`nav-btn ${location.pathname === "/attendant" ? "nav-btn-active" : ""}`}>Operario</Link>
          <Link to="/" className={`nav-btn`} onClick={handleLogout}>Cerrar Sesión</Link>
          <Link to="/form" className={`nav-btn ${location.pathname === "/form" ? "nav-btn-active" : ""}`}>Form</Link>
          <Link to="/about" className={`nav-btn ${location.pathname === "/about" ? "nav-btn-active" : ""}`}>Nosotros</Link>
        </>
      );
    }
  
    if (userRole === "encargado") {
      return (
        <>
          <Link to="/" className={`nav-btn ${location.pathname === "/" ? "nav-btn-active" : ""}`}>Inicio</Link>
          <Link to="/attendant" className={`nav-btn ${location.pathname === "/attendant" ? "nav-btn-active" : ""}`}>Encargado</Link>
          <Link to="/" className={`nav-btn`} onClick={handleLogout}>Cerrar Sesión</Link>
          <Link to="/about" className={`nav-btn ${location.pathname === "/about" ? "nav-btn-active" : ""}`}>Nosotros</Link>
        </>
      );
    }
  
    return (
      <>
        <Link to="/" className={`nav-btn ${location.pathname === "/" ? "nav-btn-active" : ""}`}>Inicio</Link>
        <Link to="/login" className={`nav-btn ${location.pathname === "/login" ? "nav-btn-active" : ""}`}>Iniciar Sesión</Link>
        <Link to="/about" className={`nav-btn ${location.pathname === "/about" ? "nav-btn-active" : ""}`}>Nosotros</Link>
      </>
    );
  };

  return (
    <nav className="nav-section">
      <div className="fix-container-left">
        <img src={logo} alt="Logo" className="logo" />
      </div>

      <div className="nav-links">
        {renderNavLinks()}
      </div>

      <div className="fix-container-right relative">
        <div className="md:hidden flex items-center pr-4">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="bg-blue-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
        <ThemeButton />
      </div>

      {isMenuOpen && <div className="burger-menu">{renderNavLinks()}</div>}

      <ConfirmModal
        show={modalData.show}
        title={modalData.title}
        message={modalData.message}
        onConfirm={modalData.onConfirm}
        onCancel={modalData.onCancel}
        singleButton={modalData.singleButton}
      />
    </nav>
  );
};

export default NavBar;