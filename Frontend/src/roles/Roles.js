import React, { useState, useEffect } from "react";
import clienteAxios from "../config/axios";
import Modal from "../Modal";
import NuevoRol from "./NuevoRol";
import Rol from "./Rol";
import { Link } from "react-router-dom"; // Importamos Link para la navegación

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]); // Nuevo estado para permisos
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const consultarAPI = async () => {
      try {
        // Obtener todos los roles
        const respuestaRoles = await clienteAxios.get("/roles");
        setRoles(respuestaRoles.data);
        console.log(respuestaRoles.data)
        // Obtener los permisos para cada rol
        const permisosPromesas = respuestaRoles.data.map(async (rol) => {
          const respuestaPermisos = await clienteAxios.get(`/roles/${rol._id}/permisos`);
          return {
            rolId: rol._id,
            permisos: respuestaPermisos.data,
          };
        });

        const permisos = await Promise.all(permisosPromesas);
        setPermissions(permisos);
      } catch (error) {
        console.error("Error al obtener roles o permisos:", error);
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
          {roles.map((rol) => {
            const permisosRol = permissions.find((p) => p.rolId === rol._id);
            return (
              <Rol
                key={rol._id}
                rol={rol}
                permisos={permisosRol ? permisosRol.permisos : []} // Pasamos los permisos asignados al rol
                actualizarEstado={actualizarEstadoRol}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Roles;
