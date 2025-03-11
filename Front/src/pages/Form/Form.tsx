import React from "react";
import MultiStepForm from "../../components/MultiStepForm/MultiStepForm";
import { FormProvider } from "../../context/FormContext";
import ProgressBar from "../../components/ProgressBar/ProgressBar";

const FormPage = () => {
  return (
    <FormProvider>
      <div className="duration 300 flex flex-col items-center justify-center w-full">
        {/* Contenedor del ProgressBar y Formulario */}
        <div className="container-form rounded-xl mt-8 bg-black pb-8 max-w-lg space-y-4">
          <MultiStepForm />
          <ProgressBar />
        </div>
      </div>
    </FormProvider>
  );
};

export default FormPage;
