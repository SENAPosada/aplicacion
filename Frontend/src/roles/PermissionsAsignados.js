// PermissionsAsignados.js
import React from "react";
import PermissionAsignado from "./PermissionAsignado";

const PermissionsAsignados = ({ permisos, actualizarEstado }) => {
  return (
    <div>
      <h3>Permisos Asignados</h3>
      <table>
        <thead>
          <tr>
            <th>Recurso</th>
            <th>Acción</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {permisos.map(permiso => (
            <PermissionAsignado
              key={permiso._id}
              permiso={permiso}
              actualizarEstado={actualizarEstado}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PermissionsAsignados;
