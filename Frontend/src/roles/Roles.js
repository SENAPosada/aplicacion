import React, { useState, useEffect } from "react";
import clienteAxios from "../config/axios";
import Modal from "../Modal";
import NuevoRol from "../roles/NuevoRol";
import { Link } from "react-router-dom"; // Importamos Link para la navegación

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const consultarAPI = async () => {
      try {
        // Obtener todos los roles con sus permisos
        const respuestaRoles = await clienteAxios.get("/roles");
        setRoles(respuestaRoles.data);
        console.log("Roles obtenidos:", respuestaRoles.data); // Verificar la estructura de los datos
      } catch (error) {
        console.error("Error al obtener roles:", error);
      }
    };
    consultarAPI();
  }, []);

  const abrirModal = () => setModalVisible(true);
  const cerrarModal = () => setModalVisible(false);

  const actualizarEstadoRol = (id, nuevoEstado) => {
    setRoles((prevRoles) =>
      prevRoles.map((rol) =>
        rol._id === id ? { ...rol, activo: nuevoEstado } : rol
      )
    );
  };

  const formatearPermisos = (permissions) => {
    if (!permissions || permissions.length === 0) {
      return "No tiene permisos asignados";
    }

    return permissions
      .map((permiso) => `${permiso.resource} - ${permiso.action}`)
      .join(", ");
  };

  return (
    <div>
      <h2>Gestión de Roles</h2>

      <button onClick={abrirModal} className="btn btn-verde nvo-rol">
        Nuevo Rol
      </button>

      {modalVisible && (
        <Modal cerrarModal={cerrarModal} titulo="Nuevo Rol">
          <NuevoRol cerrarModal={cerrarModal} />
        </Modal>
      )}

      <table className="tabla-clientes">
        <thead>
          <tr>
            <th>Roles</th>
            <th>Descripción</th>
            <th>Estado</th>
            <th>Permisos</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((rol) => (
            <tr key={rol._id}>
              <td>{rol.name}</td>
              <td>{rol.description || "Sin descripción"}</td>
              <td>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={rol.activo}
                    onChange={() => actualizarEstadoRol(rol._id, !rol.activo)}
                  />
                  <span className="slider round"></span>
                </label>
              </td>
              <td>{formatearPermisos(rol.permissions)}</td>
              <td>
                <Link to={`/roles/editar/${rol._id}`} className="btn btn-azul">
                  Editar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Roles;
