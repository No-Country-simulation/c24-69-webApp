// components/MultiStepForm.tsx
import React from "react";
import Step from "../Step/Step";
import { useFormContext } from "../../context/FormContext";
import ProgressBar from "../ProgressBar/ProgressBar";

const questionsPerStep: string[][] = [
  ["¿Revisaste el nivel de agua?", "¿Notaste fugas?", "¿Las válvulas funcionan correctamente?"],
  ["¿La pintura está intacta?", "¿Hay corrosión visible?", "¿Hay signos de desgaste?"],
  ["¿Las conexiones eléctricas están seguras?", "¿Los sensores funcionan correctamente?"],
  ["¿El sistema de bombeo opera correctamente?", "¿El flujo de agua es constante?"],
  ["¿Se ha realizado mantenimiento en los últimos 3 meses?", "¿El historial de mantenimiento está actualizado?"],
  ["¿El acceso a la cisterna está despejado?", "¿Las medidas de seguridad están en su lugar?"],
  ["¿Está lista la cisterna para salir de mantenimiento?", "¿Hay alguna observación adicional?"],
];

const MultiStepForm = () => {
  const { currentStep, setCurrentStep, answers } = useFormContext();

  const nextStep = () => setCurrentStep(Math.min(currentStep + 1, questionsPerStep.length - 1));
  const prevStep = () => setCurrentStep(Math.max(currentStep - 1, 0));

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      <Step stepNumber={currentStep} questions={questionsPerStep[currentStep]} />

      <div className="flex justify-between mt-4">
        <button onClick={prevStep} disabled={currentStep === 0} className="cursor-pointer bg-gray-400 px-4 py-2 rounded">
          Atrás
        </button>
        {currentStep < questionsPerStep.length - 1 ? (
          <button onClick={nextStep} className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded">
            Siguiente
          </button>
        ) : (
          <button 
            onClick={() => console.log("Respuestas:", answers)}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Enviar
          </button>
        )}
      </div>
      <ProgressBar />
    </div>
  );
};

export default MultiStepForm;
