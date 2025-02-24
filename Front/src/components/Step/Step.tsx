// components/Step.tsx
import React from "react";
import Checkbox from "../CheckBox/CheckBox";
import { useFormContext } from "../../context/FormContext";

interface StepProps {
  stepNumber: number;
  questions: string[];
}

const Step: React.FC<StepProps> = ({ stepNumber, questions }) => {
  const { answers, setAnswer } = useFormContext();

  return (
    <div className="h-64 w-80">
      <h2 className="text-xl font-bold mb-4">Parte {stepNumber + 1}</h2>
      {questions.map((question, index) => (
        <Checkbox 
          key={index}
          label={question}
          value={question}
          checked={answers[stepNumber]?.includes(question) || false}
          onChange={(value) => setAnswer(stepNumber, value)}
        />
      ))}
    </div>
  );
};

export default Step;
