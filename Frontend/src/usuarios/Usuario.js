import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import clienteAxios from "../config/axios";

function Usuario({ usuario }) {
    const { _id, nombres, apellidos, email, telefono, role, activo: estadoInicial } = usuario;
    const [activo, setActivo] = useState(estadoInicial);

    const cambiarEstado = async (idUsuario) => {
        const nuevoEstado = !activo;
        try {
            const respuesta = await clienteAxios.put(`/usuarios/${idUsuario}`, { activo: nuevoEstado });
            setActivo(nuevoEstado);
            Swal.fire({
                icon: "success",
                title: "Estado actualizado",
                text: respuesta.data.mensaje,
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudo actualizar el estado",
            });
        }
    };

    return (
        <Fragment>
            <tr className="usuario">
                <td>{nombres}</td>
                <td>{apellidos}</td>
                <td>{email}</td>
                <td>{telefono}</td>
                <td>{role.name}</td>
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
                    <Link to={`/usuarios/editar/${_id}`} className="btn btn-azul">
                        <i className="fas fa-pen-alt"></i>
                    </Link>
                </td>
            </tr>
        </Fragment>
    );
}

export default Usuario;
