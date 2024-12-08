import React, { useState } from "react";
import Swal from "sweetalert2";
import clienteAxios from "../config/axios";

const NewPermission = ({ cerrarModal }) => {
    const [permission, setPermission] = useState({
        resource: "",
        action: "",
        description: "",
    });

    const handleChange = (e) => {
        setPermission({
            ...permission,
            [e.target.name]: e.target.value,
        });
    };

    const agregarPermission = async (e) => {
        e.preventDefault();
        try {
            const respuesta = await clienteAxios.post("/permissions", permission);
            Swal.fire("Permiso Creado", respuesta.data.mensaje, "success");
            cerrarModal();
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudo crear el permiso",
            });
        }
    };

    const validarPermission = () => {
        const { resource, action, description } = permission;
        return !resource.length || !action.length || !description.length;
    };

    return (
        <form onSubmit={agregarPermission}>
            <legend>Crear Nuevo Permiso</legend>
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
                    <option value="">-- Selecciona un privilegio --</option>
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
                    value="Guardar Permiso"
                    disabled={validarPermission()}
                />
            </div>
        </form>
    );
};

export default NewPermission;
