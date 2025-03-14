import React from 'react';
import confirmIcon from "../../assets/check-icon.png";
import cancelIcon from "../../assets/block-icon.png";

interface ConfirmModalProps {
  show: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
  singleButton?: boolean;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  show,
  title,
  message,
  onConfirm,
  onCancel,
  singleButton = false,
}) => {
  if (!show) return null;

  return (
    <div className="modal-background">
      <section className='modal-effect'>
      <div className="modal-container">
        <h2 className="title text-center mb-2">{title}</h2>
        <p className="text-active text-center">{message}</p>
        <div className='flex flex-wrap justify-center items-center w-full gap-4'>
          {singleButton ? (
            // Si es singleButton, mostramos un único botón que cierra el modal
            <button className="close-button w-3/4 h-15 m-auto mt-4" onClick={onCancel}>
              Cerrar
            </button>
          ) : (
            // Caso por defecto, mostramos ambos botones: Cancel y Confirm
            <div className='grid grid-cols-2 gap-4 justify-center items-center w-full mt-4'>
              <button type="submit" onClick={onConfirm} className="conf-button w-3/4 m-auto">
                <img src={confirmIcon} alt="Confirm Icon" className="icon" />
                Confirmar
              </button>
              <button className="cancel-button w-3/4 m-auto" onClick={onCancel}>
                <img src={cancelIcon} alt="Cancel Icon" className='icon' />
                Cancelar
              </button>
            </div>
          )}
        </div>
      </div>
      </section>
    </div>
  );
};

export default ConfirmModal;