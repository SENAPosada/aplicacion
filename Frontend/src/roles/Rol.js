import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../config/axios';

function Rol({ rol }) {
    const { _id, nombre, descripcion, activo: estadoInicial } = rol;
    const [activo, setActivo] = useState(estadoInicial);

    const cambiarEstado = async (idRol) => {
        const nuevoEstado = !activo;
        try {
            const respuesta = await clienteAxios.put(`/roles/${idRol}`, { activo: nuevoEstado });
            setActivo(nuevoEstado);
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
            <tr className="rol">
                <td>{nombre}</td>
                <td>{descripcion}</td>
                <td>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={activo}
                            onChange={() => cambiarEstado(_id)}
                        />
                        <span className="slider round"></span>
                    </label>
                </td>
                <td>
                    <Link to={`/roles/editar/${_id}`} className="btn btn-azul">
                        <i className="fas fa-pen-alt"></i>
                    </Link>
                </td>
            </tr>
        </Fragment>
    );
}

export default Rol;
