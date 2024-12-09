import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';

function Cliente({ cliente }) {
    const { _id, nombre, apellido, tipoDocumento, cedula, empresa, email, telefono, activo: estadoInicial } = cliente;
    const [activo, setActivo] = useState(estadoInicial); // Mantener el estado local

    const cambiarEstado = async (idCliente) => {
        const nuevoEstado = !activo; // Cambia el estado actual
        try {
            // Obtener el token de localStorage
            const token = localStorage.getItem("token");

            // Enviar el token en los encabezados de la solicitud
            const respuesta = await clienteAxios.put(`/clientes/${idCliente}`, 
                { activo: nuevoEstado }, 
                {
                    headers: {
                        Authorization: `Bearer ${token}` // Enviar el token en los headers
                    }
                }
            );
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
                <td>{nombre} {apellido}</td>
                <td>{tipoDocumento}</td> {/* Mostrar el tipo de documento */}
                <td>{cedula}</td> {/* Mostrar el número de cédula */}
                <td>{empresa}</td>
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
                    <Link to={`/clientes/editar/${_id}`} className="btn btn-azul">
                        <i className="fas fa-pen-alt"></i>
                    </Link>
                    
                </td>
            </tr>
        </Fragment>
    );
}

export default Cliente;
