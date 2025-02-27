import React from "react";
import { motion } from "framer-motion";
import { useFormContext } from "../../context/FormContext";

const ProgressBar: React.FC = () => {
  const { currentStep } = useFormContext();
  const totalSteps = 7;

  return (
    <div className="flex items-center justify-center">
      {Array.from({ length: totalSteps }, (_, index) => (
        <div key={index} className="flex items-center">
          {/* Punto con animación */}
          <motion.div
            className="h-4 w-4 rounded-full"
            animate={{ backgroundColor: index <= currentStep ? "#3b82f6" : "#d1d5db" }}
            transition={{ duration: 0.5 }} 
          />

          {/* Barra de conexión (excepto el último punto) */}
          {index < totalSteps - 1 && (
            <motion.div
              className="w-8 h-1"
              animate={{ backgroundColor: index < currentStep ? "#3b82f6" : "#d1d5db" }}
              transition={{ duration: 0.5 }} 
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;
