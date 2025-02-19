import React from 'react';

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
      <section className='modalEffect'>
      <div className="modalContainer">
        <h2 className="title mb-2">{title}</h2>
        <p className="bannerBText text-center">{message}</p>
        <div className='flex flex-wrap justify-center items-center w-full gap-4'>
          {singleButton ? (
            // Si es singleButton, mostramos un único botón que cierra el modal
            <button className="" onClick={onConfirm}>
              Close
            </button>
          ) : (
            // Caso por defecto, mostramos ambos botones: Cancel y Confirm
            <div className='custom-grid justify-center items-center w-full mt-4'>
              <button className="conf-button w-full" onClick={onConfirm}>
                <span>Confirm</span>
              </button>
              <button className="cls-btn cls-btn-1 w-full" onClick={onCancel}>
                Cancel
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