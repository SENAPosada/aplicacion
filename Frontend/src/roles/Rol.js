import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import clienteAxios from "../config/axios";

const Rol = ({ rol, permisos, actualizarEstado }) => {
  const { _id, name, description, activo } = rol;

  const cambiarEstado = async () => {
    try {
      const nuevoEstado = !activo;
      await clienteAxios.put(`/roles/${_id}`, { activo: nuevoEstado });
      actualizarEstado(_id, nuevoEstado);
      Swal.fire("Estado Actualizado", "El estado del rol ha sido cambiado", "success");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo actualizar el estado del rol",
      });
    }
  };

  return (
    <tr>
      <td>{name}</td>
      <td>{description}</td>
      <td>
        <label className="switch">
          <input type="checkbox" checked={activo} onChange={cambiarEstado} />
          <span className="slider round"></span>
        </label>
      </td>
      <td>
        {/* Mostrar los permisos del rol */}
        {permisos.length > 0 ? (
          <ul>
            {permisos.map((permiso) => (
              <li key={permiso._id}>{permiso.permissionId.resource} - {permiso.permissionId.action}</li>
            ))}
          </ul>
        ) : (
          <p>No tiene permisos asignados</p>
        )}
      </td>
      <td>
        <Link to={`/roles/editar/${_id}`} className="btn btn-azul">
          <i className="fas fa-pen-alt"></i> Editar
        </Link>

        {/* Botón para redirigir a la página de asignación de permisos */}
        <Link to={`/roles/asignar-permisos/${_id}`} className="btn btn-warning ml-2">
          <i className="fas fa-key"></i> Asignar Permisos
        </Link>
      </td>
    </tr>
  );
};

export default Rol;
