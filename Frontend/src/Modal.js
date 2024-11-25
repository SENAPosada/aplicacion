// src/components/Modal.js
import React from "react";

const Modal = ({ children, cerrarModal }) => {
    return (
        <div className="modal-overlay" onClick={cerrarModal}>  {/* Fondo oscuro del modal */}
            <div 
                className="modal-contenido" 
                onClick={(e) => e.stopPropagation()}
                aria-labelledby="modalTitle"
                role="dialog"
                aria-hidden="false"
            >
                <button 
                    className="modal-cerrar" 
                    onClick={cerrarModal}
                    aria-label="Cerrar Modal"
                >
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
