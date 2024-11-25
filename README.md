Fontawsome:
1. se descarga, se copia de la carpeta CSS all.min y fontawesome.min y se pega en el CSS del proyecto
2. se copia la carpeta webfonts dentro de la carpeta public
3. se importan los dos en index.html

Implementar modal:
1. Crear Modal.js en src/:
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

2. en Clientes.js:
   importar: import Modal from "../../Modal";
3. Dentno de la function Clientes():
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar la visibilidad del modal
  const abrirModal = () => {
    setModalVisible(true);
  };

  // Función para cerrar el modal
  const cerrarModal = () => {
    setModalVisible(false);
  };
4. colocar el modal en el boton de nuevo cliente y mandar CerrarModal como prop al componente Nuevocliente que es donde está el formulario:
      {/* Mostrar el Modal si modalVisible es true */}
      {modalVisible && (
        <Modal cerrarModal={cerrarModal} titulo="Nuevo Cliente">
          <NuevoCliente cerrarModal={cerrarModal} />
        </Modal>
      )}
5. En NuevoCliente.js:
   recibir el prop de cerrarModal: function NuevoCliente({cerrarModal}) {...}
6. invocar el cerrarModal() al agregar un cliente para que se cierre por fin:
    const agregarCliente = e => {
        e.preventDefault();
        // Enviar petición
        clienteAxios.post('/clientes', cliente)
            .then(res => {
                // Validar si hay errores de mongo
                if (res.data.code === 11000) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Hubo un error',
                        text: 'El cliente ya está registrado'
                    });
                } else {
                    Swal.fire(
                        'Se agregó el Cliente',
                        res.data.mensaje,
                        "success"
                    );
                    cerrarModal();
                }
                // redireccionar 
                navigate('/clientes');
            });
    };
7. colocar estilos:
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);  /* Fondo oscuro */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;  /* Asegurarse de que el modal esté encima */
}

.modal-contenido {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    max-width: 500px;
    width: 100%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.modal-cerrar {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
}

.modal-cerrar:focus {
    outline: none;
}

/* Aseguramos que el SweetAlert se muestre encima del modal */
.swal2-container {
    z-index: 9999 !important;
}

/* Si el modal tiene un z-index muy alto, ajusta su valor */
.modal {
    z-index: 999 !important;
}












