// components/Step.tsx
import React from "react";
import Checkbox from "../CheckBox/CheckBox";
import { useFormContext } from "../../context/FormContext";

interface StepProps {
  type: string;
  stepNumber: number;
  questions: string[];
}

const Step: React.FC<StepProps> = ({ stepNumber, questions, type }) => {
  const { answers, setAnswer } = useFormContext();

  return (
    <form className="flex flex-col w-full">
      <h2 className="text-center text-xl font-bold mb-4">Parte {stepNumber + 1}</h2>
      <div className="answers-section">
      {questions.map((question, index) => (
        <Checkbox 
          type ={type}
          key={index}
          label={question}
          value={question}
          checked={answers[stepNumber]?.includes(question) || false}
          onChange={(value) => setAnswer(stepNumber, value)}
        />
      ))}
      </div>
    </form>
  );
};

export default Step;
