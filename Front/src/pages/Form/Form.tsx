import React from "react";
import MultiStepForm from "../../components/MultiStepForm/MultiStepForm";
import { FormProvider } from "../../context/FormContext";
import ProgressBar from "../../components/ProgressBar/ProgressBar";

const FormPage = () => {
  return (
    <FormProvider>
      <div className="flex flex-col items-center min-h-screen justify-center w-full">
        {/* Contenedor del ProgressBar y Formulario */}
        <div className="w-full max-w-lg space-y-4">
          <MultiStepForm />
          <ProgressBar />
        </div>
      </div>
    </FormProvider>
  );
};

export default FormPage;
