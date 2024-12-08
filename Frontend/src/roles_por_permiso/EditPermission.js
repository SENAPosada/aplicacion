import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import clienteAxios from "../config/axios";

const EditPermission = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [permission, setPermission] = useState({
    resource: "",
    action: "",
    description: "",
  });

  useEffect(() => {
    const consultarAPI = async () => {
      const respuesta = await clienteAxios.get(`/permissions/${id}`);
      setPermission(respuesta.data);
    };
    consultarAPI();
  }, [id]);

  const handleChange = (e) => {
    setPermission({
      ...permission,
      [e.target.name]: e.target.value,
    });
  };

  const actualizarPermission = async (e) => {
    e.preventDefault();
    try {
      await clienteAxios.put(`/permissions/${id}`, permission);
      Swal.fire("Permiso Actualizado", "El permiso se actualizó correctamente", "success");
      navigate("/permissions");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo actualizar el permiso",
      });
    }
  };

  const validarPermission = () => {
    const { resource, action, description } = permission;
    return !resource.length || !action.length || !description.length;
  };

  return (
    <form onSubmit={actualizarPermission}>
      <legend>Editar Permiso</legend>
      <div className="campo">
        <label>Módulo:</label>
        <input
          type="text"
          name="resource"
          placeholder="Módulo del permiso"
          onChange={handleChange}
          value={permission.resource}
        />
      </div>
      <div className="campo">
        <label>Privilegio:</label>
        <select
          name="action"
          onChange={handleChange}
          value={permission.action}
        >
          <option value="">-- Selecciona una Acción --</option>
          <option value="Crear">Crear</option>
          <option value="Leer">Leer</option>
          <option value="Actualizar">Actualizar</option>
          <option value="Eliminar">Eliminar</option>
        </select>
      </div>
      <div className="campo">
        <label>Descripción:</label>
        <input
          type="text"
          name="description"
          placeholder="Descripción del permiso"
          onChange={handleChange}
          value={permission.description}
        />
      </div>
      <div className="enviar">
        <input
          type="submit"
          className="btn btn-azul"
          value="Guardar Cambios"
          disabled={validarPermission()}
        />
      </div>
    </form>
  );
};

export default EditPermission;
