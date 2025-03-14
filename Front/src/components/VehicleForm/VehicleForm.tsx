import React from "react";
import { IForm } from "../../types/Forms/interfaceForms"; // Asegúrate de importar la interfaz desde el archivo correcto

interface VehiclesFormProps {
  form: IForm;
  onApprove: (id: string) => void;
  onDisapprove: (id: string) => void;
}

const VehiclesForm: React.FC<VehiclesFormProps> = ({ form, onApprove, onDisapprove }) => {
  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-bold mb-2">Formulario de Vehículo</h2>
      <p><strong>ID:</strong> {form.id}</p>
      <p><strong>Patente:</strong> {form.patente}</p>
      <p><strong>Observaciones:</strong> {form.observaciones}</p>
      <p><strong>Arreglo:</strong> {form.arreglo}</p>
      <div>
        <strong>Secciones:</strong>
        <ul className="list-disc list-inside">
          {Object.entries(form.secciones).map(([key, values]) => (
            <li key={key}>
              <strong>Sección {key}:</strong> {values.join(", ")}
            </li>
          ))}
        </ul>
      </div>
      <p><strong>Aprobado:</strong> {form.aprobado ? "Sí" : "No"}</p>
      <p><strong>Creado el:</strong> {new Date(form.createdAt).toLocaleDateString()}</p>
      <p><strong>Actualizado el:</strong> {new Date(form.updatedAt).toLocaleDateString()}</p>
      
      <div className="mt-4 flex gap-2">
        <button 
          className="conf-button"
          onClick={() => onApprove(form.id)}
        >
          Aprobar
        </button>
        <button 
          className="cancel-button"
          onClick={() => onDisapprove(form.id)}
        >
          Desaprobar
        </button>
      </div>
    </div>
  );
};

export default VehiclesForm;