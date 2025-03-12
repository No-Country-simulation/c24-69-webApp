import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'; // Necesario para los estilos de Swiper
import { IVehicles } from "../../../../types/Vehicles/interfaceVehicle";
import { IForm } from "../../../../types/Forms/interfaceForms";
import { useState } from "react";
import MultiStepForm from "../../../MultiStepForm/MultiStepForm";
import { updateFormStatus } from "../../../../services/fetchForms";
import ConfirmModal from "../../../ConfirmModal";

interface FormsCheckProps {
    forms: IForm[];
    vehicles: IVehicles[];
    onDisapprove: (id: string) => void;
    onApprove: (id: string) => void;
}

const FormCheck: React.FC<FormsCheckProps> = ({ vehicles, forms }) => {
    const [pendingForms, setPendingForms] = useState<IForm[]>(forms);
    const [selectedForm, setSelectedForm] = useState<IForm | null>(null);

    const [modalData, setModalData] = useState<{
        show: boolean;
        title: string;
        message: string;
        isSuccess: boolean;
        onConfirm?: () => void;
        onCancel?: () => void;
        singleButton?: boolean;
    }>({
        show: false,
        title: "",
        message: "",
        isSuccess: false,
        singleButton: true
    });

    const handleModalClose = () => {
        setModalData((prev) => ({ ...prev, show: false }));
    };

    const confirmApprove = (id: string) => {
        setModalData({
          show: true,
          title: "Aprobar formulario",
          message: "¿Estás seguro de que deseas desaprobar este formulario?",
          isSuccess: false,
          singleButton: false,
          onConfirm: () => handleApprove(id),
        });
        }

    const handleApprove = async (id: string) => {
      try {
        await updateFormStatus(id, {status: true}); // Función para actualizar en el backend
        setPendingForms((prev) => prev.filter((form) => form.id !== id)); // Quita de la vista
        setModalData({
            show: true,
            title: "Solicitud exitosa",
            message: "Formulario aprobado exitosamente.",
            isSuccess: true,
            singleButton: true,
          });
        setSelectedForm(null); // Quita el formulario si es el que está visible
      } catch (error) {
        console.error("Error al aprobar formulario:", error);
        setModalData({
            show: true,
            title: "Aprobar formulario",
            message: `Error al aprobar formulario: ${error}`,
            isSuccess: false,
            singleButton: true,
          });
        }
    };

    const confirmDisapprove = (id: string) => {
    setModalData({
      show: true,
      title: "Desaprobar formulario",
      message: "¿Estás seguro de que deseas desaprobar este formulario?",
      isSuccess: false,
      onConfirm: () => handleDisapprove(id),
    });
    }
  
    const handleDisapprove = async (id: string) => {
      try {
        await updateFormStatus(id, {status: false});
        setPendingForms((prev) => prev.filter((form) => form.id !== id));
        setModalData({
            show: true,
            title: "Solicitud exitosa",
            message: "Formulario desaprobado exitosamente.",
            isSuccess: true,
            singleButton: true,
          });
        setSelectedForm(null);
      } catch (error) {
        console.error("Error al desaprobar formulario:", error);
        setModalData({
            show: true,
            title: "Desaprobar formulario",
            message: `Error al desaprobar formulario: ${error}`,
            isSuccess: false,
            singleButton: true,
          });
      }
    };
  
return (
  <section className="forms-section">
    <div className="vehicle-cards-banner">
      <h1 className="title text-center">Revisión de Formularios</h1>
      <p className="text-active text-center">Haz clic en un vehículo para revisar su formulario.</p>

      {/* Carrusel con Swiper */}
      <Swiper
        spaceBetween={20}  // Espacio entre cada slide
        slidesPerView={3}  // Cuántas cards se muestran al mismo tiempo
        loop={true}  // Para que el carrusel se repita de forma infinita
        pagination={{ clickable: true }}  // Agrega paginación para navegar entre los slides
        navigation={true}  // Permite navegar con las flechas
        breakpoints={{
          640: { slidesPerView: 1 },  // Para pantallas pequeñas, solo muestra 1 card
          768: { slidesPerView: 2 },  // Para pantallas medianas, muestra 2 cards
          1024: { slidesPerView: 3 },  // En pantallas grandes, muestra 3 cards
        }}
      >
    {pendingForms.map((form) => {
      const vehicle = vehicles.find((v) => v.patente === form.patente);
      return (
        <SwiperSlide key={form.id}>
          <div className="vehicle-card" onClick={() => setSelectedForm(form)}>
            <h3>{vehicle?.marca}</h3>
            <h3>{vehicle?.modelo}</h3>
            <p>Patente: {vehicle?.patente}</p>
          </div>
        </SwiperSlide>
      );
    })}
  </Swiper>

  {/* Mostrar formulario si hay uno seleccionado */}
  {selectedForm && (
    <MultiStepForm
      form={selectedForm}
      onApprove={() => confirmApprove(selectedForm.id)}
      onDisapprove={() => confirmDisapprove(selectedForm.id)}
    />
  )}
</div>

    <ConfirmModal
      show={modalData.show}
      title={modalData.title}
      message={modalData.message}
      onConfirm={handleModalClose}
      singleButton={true}
      />
    </section>
  );
};

export default FormCheck;