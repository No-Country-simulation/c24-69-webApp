import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Step from "../Step/Step";
import { useFormContext } from "../../context/FormContext";

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

  const nextStep = () => setCurrentStep(Math.min(currentStep + 1, questionsPerStep.length - 1));
  const prevStep = () => setCurrentStep(Math.max(currentStep - 1, 0));

  // Variantes de animación para toda la tarjeta del formulario
  const variants = {
    enter: { opacity: 0, x: 100 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  return (
    <div className="flex flex-col items-center min-h-[500px] p-10">
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
        <Step stepNumber={currentStep} questions={questionsPerStep[currentStep]} />

        {/* Botones de navegación */}
        <div className="flex justify-between mt-auto">
          <button 
            onClick={prevStep} 
            disabled={currentStep === 0} 
            className="cursor-pointer bg-gray-400 hover:bg-gray-500 duration-300 px-4 py-2 rounded"
          >
            Atrás
          </button>
          {currentStep < questionsPerStep.length - 1 ? (
            <button 
              onClick={nextStep} 
              className="cursor-pointer hover:bg-blue-700 duration-300 bg-blue-600 text-white px-4 py-2 rounded"
            >
              Siguiente
            </button>
          ) : (
            <button 
              onClick={() => console.log("Respuestas:", answers)}
              className="cursor-pointer hover:bg-green-700 duration-300 bg-green-600 text-white px-4 py-2 rounded"
            >
              Enviar
            </button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  </div>
  );
};

export default MultiStepForm;
