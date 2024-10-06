import React, { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import clienteAxios from "../../config/axios";
import Repuesto from "./Repuesto"; // Cambiar a Repuesto
import Swal from "sweetalert2";

function Repuestos() { // Cambiar a Repuestos
    const [repuestos, guardarRepuestos] = useState([]); // Cambiar a repuestos
    const [repuestoSeleccionado, setRepuestoSeleccionado] = useState(null); // Cambiar a repuestoSeleccionado

    const consultarAPI = async () => {
        const repuestosConsulta = await clienteAxios.get('/repuestos'); // Cambiar a repuestos
        guardarRepuestos(repuestosConsulta.data); // Cambiar a guardarRepuestos
    };

    useEffect(() => {
        consultarAPI();
    }, [repuestos]); // Cambiar a repuestos

    const mostrarModal = (repuesto) => { // Cambiar a repuesto
        setRepuestoSeleccionado(repuesto); // Cambiar a setRepuestoSeleccionado
    };

    const cerrarModal = () => {
        setRepuestoSeleccionado(null); // Cambiar a setRepuestoSeleccionado
    };

    return (
        <Fragment>
            <h2>Repuestos</h2> {/* Cambiar a Repuestos */}

            <Link to={'/repuestos/nuevo'} className="btn btn-verde nvo-cliente">
                <i className="fas fa-plus-circle"></i>
                Nuevo Repuesto {/* Cambiar a Nuevo Repuesto */}
            </Link>

            {repuestos.length > 0 && ( // Cambiar a repuestos
                <table className="tabla-clientes">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {repuestos.map(repuesto => ( // Cambiar a repuesto
                            <Repuesto // Cambiar a Repuesto
                                key={repuesto._id} // Cambiar a repuesto
                                repuesto={repuesto} // Cambiar a repuesto
                                mostrarModal={mostrarModal}
                            />
                        ))}
                    </tbody>
                </table>
            )}

            {repuestoSeleccionado && ( // Cambiar a repuestoSeleccionado
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={cerrarModal}>&times;</span>
                        <h2>{repuestoSeleccionado.nombre}</h2> {/* Cambiar a repuestoSeleccionado */}
                        <p>Precio: {repuestoSeleccionado.precio}</p> {/* Cambiar a repuestoSeleccionado */}
                        <p>Descripción: {repuestoSeleccionado.descripcion}</p> {/* Cambiar a repuestoSeleccionado */}
                        {repuestoSeleccionado.imagen && ( // Cambiar a repuestoSeleccionado
                            <img
                                src={`http://localhost:5000/${repuestoSeleccionado.imagen}`} // Cambiar a repuestoSeleccionado
                                alt={repuestoSeleccionado.nombre} // Cambiar a repuestoSeleccionado
                                style={{ width: '100%', height: 'auto' }}
                            />
                        )}
                    </div>
                </div>
            )}
        </Fragment>
    );
}

export default Repuestos; // Cambiar a Repuestos
