import ThemeButton from "../../components/ThemeButton/index";
import ConfirmModal from "../../components/ConfirmModal/index";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo1.png";

const NavBar: React.FC = () => {

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
          <div className="fix-container-left ">
            <img src={logo} alt="Logo" className="logo" />
          </div>
          <Link
            className=""
            to="/home"
          >
            Home
          </Link>
            </div>
            </div>
          <div className="fix-container-right ">
            <ThemeButton />
          </div>

      {/* Modal de confirmación de logout */}
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
