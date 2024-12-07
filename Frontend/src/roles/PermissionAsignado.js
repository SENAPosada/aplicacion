// PermissionAsignado.js
import React from "react";
import Swal from "sweetalert2";
import clienteAxios from "../config/axios";

const PermissionAsignado = ({ permiso, actualizarEstado }) => {
  const { _id, resource, action, activo } = permiso;

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
      <td>
        <label className="switch">
          <input type="checkbox" checked={activo} onChange={cambiarEstado} />
          <span className="slider round"></span>
        </label>
      </td>
    </tr>
  );
};

export default PermissionAsignado;
