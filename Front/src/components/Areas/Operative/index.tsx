import { Link } from "react-router-dom";
import RegisterVehicle from "./RegisterVehicle";


const OperativeArea: React.FC = () => {

return(
        <section className="w-full max-w-6xl m-auto flex flex-col justify-center items-center">
            <div className="operative-banner">
            <h1 className="title text-center">Área de Operario</h1>
            <div className="grid grid-cols-2 justify-center">
            <p className="text-active text-xl">Si quieres realizar el examen de un vehículo, haz clic en el botón para dirigirte a la página</p>
            <Link to="/form" className={`nav-btn ${location.pathname === "/form"}`}>Formularios</Link>
            </div>
            <RegisterVehicle/>
            </div>
        </section>
    )
}

export default OperativeArea;