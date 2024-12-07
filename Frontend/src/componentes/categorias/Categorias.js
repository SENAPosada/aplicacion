import React, { useEffect, useState, Fragment } from "react";
import clienteAxios from "../../config/axios";
import Categoria from "./Categoria";
import { Link } from 'react-router-dom';
import Modal from "../../Modal";
import NuevaCategoria from "./NuevaCategoria";

function Categorias() {
    const [categorias, guardarCategorias] = useState([]);
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
    // Función para consultar las categorías desde la API
    const consultarAPI = async () => {
        const categoriasConsulta = await clienteAxios.get("/categorias");
        guardarCategorias(categoriasConsulta.data);
    };

    // Ejecutar la consulta una sola vez al montar el componente
    useEffect(() => {
        consultarAPI();
    }, []); // Solo necesita ejecutarse una vez al montar el componente

    return (
        <Fragment>
            <h2>Categorías</h2>

            {/* Botón para agregar una nueva categoría */}
            <Link to={"/categorias/nuevo"} className="btn btn-verde nvo-categoria">
                <i className="fas fa-plus-circle"></i>
                Nueva Categoría
            </Link>

      {/* Mostrar el Modal si modalVisible es true */}
      {modalVisible && (
        <Modal cerrarModal={cerrarModal} titulo="Nueva categoria">
          <NuevaCategoria cerrarModal={cerrarModal} />
        </Modal>
      )}

            {/* Mostrar la tabla solo si hay categorías */}
            {categorias.length > 0 ? (
                <table className="tabla-clientes">
                    <thead>
                        <tr>
                            <th>Nombre de la Categoría</th> {/* Cambiar según sea necesario */}
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categorias.map(categoria => (
                            <Categoria
                                key={categoria._id}
                                categoria={categoria}
                            />
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay categorías disponibles.</p> // Mensaje si no hay categorías
            )}
        </Fragment>
    );
}

export default Categorias;
