import React, { useState, useEffect } from "react";
import clienteAxios from "../config/axios";
import Modal from "../Modal";
import Permission from "./Permission";
import NewPermission from "./NewPermission";

const Permissions = () => {
  const [permissions, setPermissions] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const consultarAPI = async () => {
      const respuesta = await clienteAxios.get("/permissions");
      setPermissions(respuesta.data);
    };
    consultarAPI();
  }, []);

  const abrirModal = () => setModalVisible(true);
  const cerrarModal = () => setModalVisible(false);

  const actualizarEstadoPermission = (id, nuevoEstado) => {
    setPermissions((prevPermissions) =>
      prevPermissions.map((permission) =>
        permission._id === id ? { ...permission, activo: nuevoEstado } : permission
      )
    );
  };

  return (
    <div>
      <h2>Gestión de Permisos</h2>

      <button onClick={abrirModal} className="btn btn-verde nvo-permission">
        Nuevo Permiso
      </button>

      {modalVisible && (
        <Modal cerrarModal={cerrarModal} titulo="Nuevo Permiso">
          <NewPermission cerrarModal={cerrarModal} />
        </Modal>
      )}

      <table className="tabla-clientes">
        <thead>
          <tr>
            <th>Módulo</th>
            <th>Privilegio</th>
            <th>Descripción</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {permissions.map((permission) => (
            <Permission
              key={permission._id}
              permission={permission}
              actualizarEstado={actualizarEstadoPermission}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Permissions;
