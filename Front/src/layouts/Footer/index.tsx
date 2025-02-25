import React from "react";
import logo from "../../assets/logo1.png"

const Footer: React.FC = () => {
  return (
    <footer className="footer-container">
        <div className="grid grid-cols-2 items-center gap-4">
          <div>
            <div className="flex flex-row gap-4 items-center">
            <img src={logo} alt="logo" className="h-15 w-15 rounded-full" />
            <h1 className="sub-title">Truck Scan</h1>
            </div>
            <p className="text-active mt-2">© Derechos de Autor, 2025</p>
          </div>

            <p className="text-active">Este sitio web aún está en desarrollo. Agradecemos mucho tu paciencia, tu visita y esperamos que disfrutes nuestros servicios</p>
        </div>
    </footer>
  );
};

export default Footer;