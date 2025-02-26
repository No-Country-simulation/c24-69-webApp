import React from "react";
import MultiStepForm from "../../components/MultiStepForm/MultiStepForm";
import { FormProvider } from "../../context/FormContext";
import ProgressBar from "../../components/ProgressBar/ProgressBar";

const FormPage = () => {
  return (
    <FormProvider>
      {/* Contenedor sin márgenes innecesarios y con alineación correcta */}
      <div className="flex flex-col items-center w-full gap-2">
        <MultiStepForm />
        <ProgressBar />
      </div>
    </FormProvider>
  );
};

export default FormPage;
