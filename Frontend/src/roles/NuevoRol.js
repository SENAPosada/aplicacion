import React, { useState } from "react";
import Swal from "sweetalert2";
import clienteAxios from "../config/axios";

const NuevoRol = ({ cerrarModal }) => {
  const [rol, setRol] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    setRol({
      ...rol,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setRol({ name: "", description: "" });
  };

  const agregarRol = async (e) => {
    e.preventDefault();
    try {
      const respuesta = await clienteAxios.post("/roles", rol);
      Swal.fire("Rol creado", respuesta.data.mensaje, "success");
      resetForm();
      cerrarModal();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "No se pudo crear el rol",
      });
    }
  };

  const validarRol = () => {
    const { name, description } = rol;
    return !name.trim() || !description.trim();
  };

  return (
    <form onSubmit={agregarRol}>
      <legend>Crear Nuevo Rol</legend>
      <div className="campo">
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Nombre del rol"
          onChange={handleChange}
          value={rol.name}
          aria-label="Nombre del rol"
        />
      </div>
      <div className="campo">
        <label htmlFor="description">Descripción:</label>
        <input
          type="text"
          id="description"
          name="description"
          placeholder="Descripción del rol"
          onChange={handleChange}
          value={rol.description}
          aria-label="Descripción del rol"
        />
      </div>
      <div className="enviar">
        <input
          type="submit"
          className="btn btn-azul"
          value="Guardar Rol"
          disabled={validarRol()}
        />
      </div>
    </form>
  );
};

export default NuevoRol;
