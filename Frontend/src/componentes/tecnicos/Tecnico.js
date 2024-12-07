import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';

function Tecnico({ tecnico }) {
    const { _id, nombre, apellido, tipoDocumento, cedula, email, telefono, activo: estadoInicial } = tecnico;
    const [activo, setActivo] = useState(estadoInicial); // Mantener el estado local

    const cambiarEstado = async (idTecnico) => {
        const nuevoEstado = !activo; // Cambia el estado actual
        try {
            const respuesta = await clienteAxios.put(`/tecnicos/${idTecnico}`, { activo: nuevoEstado });
            setActivo(nuevoEstado); // Actualiza el estado local
            Swal.fire({
                icon: 'success',
                title: 'Estado actualizado',
                text: respuesta.data.mensaje,
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo actualizar el estado',
            });
        }
    };

    const eliminarTecnico = idTecnico => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Una categoría eliminada no se puede recuperar.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar!",
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                // Llamar a la API para eliminar la categoría
                clienteAxios.delete(`/tecnicos/${idTecnico}`)
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
                            "No se pudo eliminar la categoría",
                            "error"
                        );
                    });
            }
        });
    };
    return (
        <Fragment>
            <tr className="cliente">
                <td>{nombre} {apellido}</td>
                <td>{tipoDocumento}</td>
                <td>{cedula}</td>
                <td>{email}</td>
                <td>{telefono}</td>
                <td>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={activo} // Vincula el estado local al checkbox
                            onChange={() => cambiarEstado(_id)} // Cambia el estado al hacer clic
                        />
                        <span className="slider round"></span>
                    </label>
                </td>
                <td>
                    <Link to={`/tecnicos/editar/${_id}`} className="btn btn-azul">
                        <i className="fas fa-pen-alt"></i>

                    </Link>
                    {/* Botón para eliminar la categoría */}
                    <button
                        type="button"
                        className="btn btn-rojo btn-eliminar"
                        onClick={() => eliminarTecnico(_id)}
                    >
                        <i className="fas fa-times"></i>

                    </button>
                </td>
            </tr>
        </Fragment>
    );
}

export default Tecnico;
