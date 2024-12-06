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

   <Link to="#" onClick={abrirModal} className="btn btn-verde nvo-cliente">
         <i className="fas fa-plus-circle"></i>
          Nuevo Cliente
   </Link>
   
5. colocar el modal en el boton de nuevo cliente y mandar CerrarModal como prop al componente Nuevocliente que es donde está el formulario:
      {/* Mostrar el Modal si modalVisible es true */}
      {modalVisible && (
        <Modal cerrarModal={cerrarModal} titulo="Nuevo Cliente">
          <NuevoCliente cerrarModal={cerrarModal} />
        </Modal>
      )}
6. En NuevoCliente.js:
   recibir el prop de cerrarModal: function NuevoCliente({cerrarModal}) {...}
7. invocar el cerrarModal() al agregar un cliente para que se cierre por fin:
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
8. colocar estilos:
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


Cada vez que queramos implementar un modal en un componente:
cuando se implementa un modal en React y este se muestra en el mismo contexto de página, el cambio en la URL no ocurre, ya que el modal se renderiza dentro de la misma ruta y no en una nueva.
Al hacer clic en un enlace (por ejemplo, para editar o asignar permisos a un rol), la URL de la página cambia y se ejecuta una nueva carga de componentes según esa URL. Esto permite que los hooks como useParams() obtengan valores actualizados de la URL, como el ID de un rol, que luego puedes usar para hacer solicitudes a la API o mostrar información.

1. Agregar un estado modalVisible en Rol.js
Definí el estado modalVisible para controlar la visibilidad del modal.
El estado se inicializa como false, lo que significa que el modal está oculto al principio.
const [modalVisible, setModalVisible] = useState(false);
2. Botón de apertura del modal en Rol.js
Añadí un botón con el texto "Asignar Permisos", que, al hacer clic, cambia el estado modalVisible a true, mostrando el modal.
<button onClick={abrirModal} className="btn btn-warning ml-2">
  <i className="fas fa-key"></i> Asignar Permisos
</button>
La función abrirModal cambia el estado modalVisible a true.
const abrirModal = () => setModalVisible(true);
3. Renderizar el modal en Rol.js
Condicionalmente rendericé el modal solo si modalVisible es true.
Dentro del modal, rendericé el componente AsignarPermisos, pasándole el rolId como propiedad para obtener el rol en el modal.
{modalVisible && (
  <Modal cerrarModal={cerrarModal} titulo="Asignar Permisos">
    <AsignarPermisos rolId={_id} cerrarModal={cerrarModal} />
  </Modal>
)}
4. Cerrar el modal en Rol.js
Añadí una función cerrarModal que cambia el estado modalVisible a false, lo que oculta el modal.
const cerrarModal = () => setModalVisible(false);
5. si al hacer click redirige a otro componente, en ese componente le puedes colocar un cerrar justo despues del </form>:
   <button onClick={cerrarModal} className="mt-3">Cerrar Modal</button>








