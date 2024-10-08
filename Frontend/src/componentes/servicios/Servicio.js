import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';

// Componente para mostrar cada servicio individual
function Servicio({ servicio }) {
    // Extraer los valores del servicio
    const { _id, tipo } = servicio; // Asegúrate de cambiar los campos según la estructura de tu servicio

    // Función para eliminar un servicio
    const eliminarServicio = idServicio => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Un servicio eliminado no se puede recuperar.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar!",
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                // Llamar a la API para eliminar el servicio
                clienteAxios.delete(`/servicios/${ idServicio }`)
                    .then(res => {
                        Swal.fire(
                            "¡Eliminado!",
                            res.data.mensaje,
                            "success"
                        );
                    })
                    .catch(error => {
                        Swal.fire(
                            "Error",
                            "No se pudo eliminar el servicio",
                            "error"
                        );
                    });
            }
        });
    };

    return (
        <Fragment>
            <tr>
                <td>{tipo}</td> {/* Ajustar según los campos de servicio */}
                <td>
                    {/* Editar un servicio con un id específico */}
                    <Link to={`/servicios/editar/${_id}`} className="btn btn-azul">
                        <i className="fas fa-pen-alt"></i>
                    </Link>

                    {/* Botón para eliminar el servicio */}
                    <button
                        type="button"
                        className="btn btn-rojo btn-eliminar"
                        onClick={() => eliminarServicio(_id)}
                    >
                        <i className="fas fa-times"></i>
                    </button>
                </td>
            </tr>
        </Fragment>
    );
}

export default Servicio;
