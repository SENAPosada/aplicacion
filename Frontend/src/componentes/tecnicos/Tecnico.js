import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';

function Tecnico({ tecnico }) {
    const { _id, nombres, apellidos, tipoDocumento, documento, email, telefono, activo: estadoInicial } = tecnico;
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

    return (
        <Fragment>
            <tr className="cliente">
                <td>{nombres} {apellidos}</td>
                <td>{tipoDocumento}</td>
                <td>{documento}</td>
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
                </td>
            </tr>
        </Fragment>
    );
}

export default Tecnico;
