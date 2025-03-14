import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Step from "../Step/Step";
import { useFormContext } from "../../context/FormContext";
import { IVehicles } from "../../types/Vehicles/interfaceVehicle";
import { fetchVehicles } from "../../services/fetchVehicles";
import { sendForm } from "../../services/fetchForms";
import ConfirmModal from "../ConfirmModal";

const questionsPerStep: string[][] = [
  ["¿Revisaste el nivel de agua?", "¿Notaste fugas?", "¿Las válvulas funcionan correctamente?"],
  ["¿La pintura está intacta?", "¿Hay corrosión visible?", "¿Hay signos de desgaste?"],
  ["¿Las conexiones eléctricas están seguras?", "¿Los sensores funcionan correctamente?"],
  ["¿El sistema de bombeo opera correctamente?", "¿El flujo de agua es constante?"],
  ["¿Se ha realizado mantenimiento en los últimos 3 meses de trabajo?", "¿El historial de mantenimiento está actualizado hasta la fecha actual?"],
  ["¿El acceso a la cisterna está despejado?", "¿Las medidas de seguridad están en su lugar?"],
  ["¿Está lista la cisterna para salir de mantenimiento?", "¿Hay alguna observación adicional?"],
];

const MultiStepForm: React.FC = () => {  
  const { currentStep, setCurrentStep, answers } = useFormContext();
  const [selectedPatente, setSelectedPatente] = useState("");
  const [vehicles, setVehicles] = useState<IVehicles[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalData, setModalData] = useState({
    show: false,
    title: "",
    message: "",
    isSuccess: false,
    singleButton: true,
  });

  // Cargar vehículos al montar el componente
  useEffect(() => {
    const loadVehicles = async () => {
      try {
        const vehiclesList = await fetchVehicles();
        setVehicles(vehiclesList);
      } catch (error) {
        console.error("Error cargando vehículos:", error);
      }
    };
    loadVehicles();
  }, []);

  const nextStep = () => setCurrentStep(Math.min(currentStep + 1, questionsPerStep.length - 1));
  const prevStep = () => setCurrentStep(Math.max(currentStep - 1, 0));

  // Variantes de animación
  const variants = {
    enter: { opacity: 0, x: 100 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  const handleSubmit = async () => {
    if (!selectedPatente) {
      setModalData({
        show: true,
        title: "Error",
        message: "Por favor, selecciona un vehículo antes de enviar el formulario.",
        isSuccess: false,
        singleButton: true,
      });
      return;
    }

    setIsLoading(true);

    // Transformar `answers` en un formato adecuado
    const secciones: Record<number, string[]> = Object.entries(answers).reduce((acc, [step, respuestas]) => {
      acc[parseInt(step)] = respuestas;
      return acc;
    }, {} as Record<number, string[]>);

    const requestBody = {
      observaciones: "",
      arreglo: "",
      patente: selectedPatente,
      secciones,
    };

    try {
      await sendForm(requestBody);
      setModalData({
        show: true,
        title: "Éxito",
        message: "Formulario enviado con éxito.",
        isSuccess: true,
        singleButton: true,
      });
    } catch {
      setModalData({
        show: true,
        title: "Error",
        message: "Error al enviar el formulario. Inténtalo de nuevo.",
        isSuccess: false,
        singleButton: true,
      });
  };
};

  return (
    <div className="flex flex-col items-center min-h-[600px] p-10">
      {/* Selector de vehículos */}
      <select 
        value={selectedPatente} 
        onChange={(e) => setSelectedPatente(e.target.value)}
        className="vehicle-form-input mb-8"
      >
        <option value="">Selecciona un vehículo</option>
        {vehicles.map((vehiculo) => (
          <option key={vehiculo.id} value={vehiculo.patente}>
            {vehiculo.patente} - {vehiculo.modelo}
          </option>
        ))}
      </select>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.450 }}
          className="background-form overflow-hidden w-full max-w-[400px] p-6 mx-auto text-white rounded-lg shadow-xl relative flex flex-col flex-grow"
        >
          {/* Contenido del formulario */}
          <Step type={"checkbox"} stepNumber={currentStep} questions={questionsPerStep[currentStep]} />

          {/* Botones de navegación */}
          <div className="flex justify-between mt-auto">
            <button 
              onClick={prevStep} 
              disabled={currentStep === 0} 
              className="cursor-pointer bg-gray-400 hover:bg-gray-500 duration-300 text-center rounded w-1/4 h-10"
            >
              Atrás
            </button>
            {currentStep < questionsPerStep.length - 1 ? (
              <button 
                onClick={nextStep} 
                className="cursor-pointer hover:bg-blue-700 duration-300 bg-blue-600 text-white text-center rounded w-1/4 h-10"
              >
                Siguiente
              </button>
            ) : (
              <button 
                onClick={handleSubmit}
                disabled={isLoading}
                className={`cursor-pointer px-4 py-2 rounded text-white duration-300 ${
                  isLoading ? "bg-gray-500 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {isLoading ? "Enviando..." : "Enviar"}
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Modal de confirmación */}
      <ConfirmModal {...modalData} onConfirm={() => setModalData({ ...modalData, show: false })} />
    </div>
  );
};

export default MultiStepForm;