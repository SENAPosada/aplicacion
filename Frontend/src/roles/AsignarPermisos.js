import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import Modal from "../Modal";
import NuevoPermisoAsignado from "./NuevoPermisoAsignado";

const AsignarPermisos = () => {
    const { id } = useParams();
    const [rol, setRol] = useState({});
    const [permissions, setPermissions] = useState([]);
    const [selectedPermissions, setSelectedPermissions] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        // Obtener datos del rol
        axios.get(`http://localhost:5000/roles/${id}`)
            .then(response => setRol(response.data))
            .catch(error => console.error("Error al obtener el rol:", error));

        // Obtener permisos disponibles
        axios.get("http://localhost:5000/permissions")
            .then(response => setPermissions(response.data))
            .catch(error => console.error("Error al obtener permisos:", error));
    }, [id]);

    const handlePermissionChange = (e) => {
        const permissionId = e.target.value;
        setSelectedPermissions(prevState =>
            prevState.includes(permissionId)
                ? prevState.filter(id => id !== permissionId)
                : [...prevState, permissionId]
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (selectedPermissions.length === 0) {
            Swal.fire("Error", "Debes seleccionar al menos un permiso", "error");
            return;
        }
    
        // Enviar permisos al backend uno a uno
        selectedPermissions.forEach((permissionId) => {
            axios.post(`http://localhost:5000/roles/asignar-permisos/${id}`, {
                roleId: id,  // Asegúrate de que el id del rol esté presente en el cuerpo
                permissionId: permissionId // Enviar solo un permiso por cada solicitud
            })
                .then(response => {
                    Swal.fire("Éxito", "Permisos asignados correctamente", "success");
                    cerrarModal();
                })
                .catch(error => {
                    Swal.fire("Error", "Hubo un problema al asignar permisos", "error");
                });
        });
    };
    

    const abrirModal = () => setModalVisible(true);
    const cerrarModal = () => setModalVisible(false);

    return (
        <div className="container mt-4">
            <h2>Asignar Permisos a Rol: {rol.name}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <h3>Seleccionar Permisos</h3>
                    {permissions.map(permission => (
                        <div key={permission._id}>
                            <input
                                type="checkbox"
                                id={`permission-${permission._id}`}
                                value={permission._id}
                                checked={selectedPermissions.includes(permission._id)}
                                onChange={handlePermissionChange}
                            />
                            <label htmlFor={`permission-${permission._id}`} className="ml-2">
                                {permission.resource} - {permission.action}
                            </label>
                        </div>
                    ))}
                </div>
                <button type="submit">Asignar Permisos</button>
            </form>

            <button onClick={abrirModal} className="mt-3">Agregar Nuevo Permiso</button>

            {modalVisible && (
                <Modal cerrarModal={cerrarModal} titulo="Nuevo Permiso">
                    <NuevoPermisoAsignado cerrarModal={cerrarModal} />
                </Modal>
            )}
        </div>
    );
};

export default AsignarPermisos;
