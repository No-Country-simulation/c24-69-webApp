// pages/FormPage.tsx
import React from "react";
import MultiStepForm from "../../components/MultiStepForm/MultiStepForm";
import { FormProvider } from "../../context/FormContext";

const FormPage = () => {
  return (
    <FormProvider>
      <div className="flex flex-col items-center w-full mt-10 z-100 absolute">
        <h1 className="text-2xl font-bold">Formulario de Inspección</h1>
        <MultiStepForm />
      </div>
    </FormProvider>
  );
};

export default FormPage;
