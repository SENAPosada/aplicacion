// NuevoPermisoAsignado.js
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const NuevoPermisoAsignado = ({ cerrarModal }) => {
  const [permiso, setPermiso] = useState({
    resource: "",
    action: "",
  });

  const handleChange = (e) => {
    setPermiso({
      ...permiso,
      [e.target.name]: e.target.value,
    });
  };

  const agregarPermiso = async (e) => {
    e.preventDefault();
    try {
      const respuesta = await axios.post("http://localhost:5000/permissions", permiso);
      Swal.fire("Permiso creado", respuesta.data.mensaje, "success");
      cerrarModal();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo crear el permiso",
      });
    }
  };

  const validarPermiso = () => {
    const { resource, action } = permiso;
    return !resource.length || !action.length;
  };

  return (
    <form onSubmit={agregarPermiso}>
      <legend>Crear Nuevo Permiso</legend>
      <div className="campo">
        <label>Recurso:</label>
        <input
          type="text"
          name="resource"
          placeholder="Recurso del permiso"
          onChange={handleChange}
          value={permiso.resource}
        />
      </div>
      <div className="campo">
        <label>Acción:</label>
        <input
          type="text"
          name="action"
          placeholder="Acción del permiso"
          onChange={handleChange}
          value={permiso.action}
        />
      </div>
      <div className="enviar">
        <input
          type="submit"
          className="btn btn-azul"
          value="Guardar Permiso"
          disabled={validarPermiso()}
        />
      </div>
    </form>
  );
};

export default NuevoPermisoAsignado;
