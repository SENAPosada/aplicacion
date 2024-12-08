import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import clienteAxios from "../config/axios";

const Permission = ({ permission, actualizarEstado }) => {
    const { _id, resource, action, description, activo } = permission;

    const cambiarEstado = async () => {
        try {
            const nuevoEstado = !activo;
            await clienteAxios.put(`/permissions/${_id}`, { activo: nuevoEstado });
            actualizarEstado(_id, nuevoEstado);
            Swal.fire("Estado Actualizado", "El estado del permiso ha sido cambiado", "success");
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudo actualizar el estado del permiso",
            });
        }
    };

    return (
        <tr>
            <td>{resource}</td>
            <td>{action}</td>
            <td>{description}</td>
            <td>
                <label className="switch">
                    <input type="checkbox" checked={activo} onChange={cambiarEstado} />
                    <span className="slider round"></span>
                </label>
            </td>
            <td>
                <Link to={`/permissions/editar/${_id}`} className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i>
                </Link>
            </td>
        </tr>
    );
};

export default Permission;
