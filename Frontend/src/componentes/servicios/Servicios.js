import React, { useEffect, useState, Fragment } from "react";
import clienteAxios from "../../config/axios";
import Servicio from "./Servicio"; // Componente individual para mostrar cada servicio
import { Link } from 'react-router-dom';
import Modal from "../../Modal";
import NuevoServicio from "./NuevoServicio"
function Servicios() {
    const [servicios, guardarServicios] = useState([]);
    const [modalVisible, setModalVisible] = useState(false); // Estado para controlar la visibilidad del modal

    const abrirModal = () => {
        setModalVisible(true);
    };

    // Función para cerrar el modal
    const cerrarModal = () => {
        setModalVisible(false);
    };

    // Función para consultar los servicios desde la API
    const consultarAPI = async () => {
        const serviciosConsulta = await clienteAxios.get("/servicios");
        guardarServicios(serviciosConsulta.data);
    };

    // Ejecutar la consulta una sola vez al montar el componente
    useEffect(() => {
        consultarAPI();
    }, []); // Solo necesita ejecutarse una vez al montar el componente
// Aca arriba colocaba "servicios" pero se ejecutaba siempre
    return (
        <Fragment>
            <h2>Gestión de servicios</h2>

            {/* Botón para agregar un nuevo servicio */}
            <Link to="#" onClick={abrirModal} className="btn btn-verde nvo-servicio">
                <i className="fas fa-plus-circle"></i>
                Nuevo Servicio
            </Link>

            {/* Mostrar el Modal si modalVisible es true */}
            {modalVisible && (
                <Modal cerrarModal={cerrarModal} titulo="Nuevo servicio">
                    <NuevoServicio cerrarModal={cerrarModal} />
                </Modal>
            )}

            {/* Mostrar la tabla solo si hay servicios */}
            {servicios.length > 0 ? (
                <table className="tabla-clientes">
                    <thead>
                        <tr>
                            <th>Nombre del Servicio</th> {/* Cambiar según sea necesario */}
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {servicios.map(servicio => (
                            <Servicio
                                key={servicio._id}
                                servicio={servicio}
                            />
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay servicios disponibles.</p> // Mensaje si no hay servicios
            )}
        </Fragment>
    );
}

export default Servicios;
