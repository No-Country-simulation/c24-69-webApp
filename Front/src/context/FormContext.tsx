// context/FormContext.tsx
import React, { createContext, useContext, useState } from "react";

interface FormContextType {
  answers: Record<number, string[]>; // Un objeto donde cada paso tiene un array de respuestas
  setAnswer: (step: number, value: string) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [answers, setAnswers] = useState<Record<number, string[]>>({});
  const [currentStep, setCurrentStep] = useState(0);

  const setAnswer = (step: number, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [step]: prev[step]?.includes(value)
        ? prev[step].filter((answer) => answer !== value)
        : [...(prev[step] || []), value],
    }));
  };

  return (
    <FormContext.Provider value={{ answers, setAnswer, currentStep, setCurrentStep }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) throw new Error("useFormContext must be used within a FormProvider");
  return context;
};
