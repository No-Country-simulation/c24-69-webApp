import React from "react";
import logo from "../../assets/logo1.png"

const Footer: React.FC = () => {
  return (
    <footer>
        <div className="grid grid-cols-2 items-center gap-4">
          <div className="flex flex-col m-auto">
            <div className="flex flex-row items-center">
            <img src={logo} alt="logo" className="h-14 w-14 rounded-full" />
            <h1 className="footer-title ml-4">Truck Scan</h1>
            </div>
            <p className="text-active mt-2">© Derechos de Autor, 2025</p>
          </div>

            <p className="text-active">Este sitio web aún está en desarrollo. Agradecemos mucho tu paciencia, tu visita y esperamos que disfrutes nuestros servicios</p>
        </div>
    </footer>
  );
};

export default Footer;