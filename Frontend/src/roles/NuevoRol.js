import React, { useState } from "react";
import Swal from "sweetalert2";
import clienteAxios from "../config/axios";

// Lista predeterminada de componentes
const COMPONENTS = [
    "usuarios",
    "roles",
    "horarios",
    "clientes",
    "tecnicos",
    "categorias",
    "repuestos",
    "servicios",
    "citas",
    "ventas",
];

// Lista predeterminada de privilegios
const PRIVILEGES = ["Crear", "Leer", "Actualizar", "Eliminar"];

const NuevoRol = ({ cerrarModal }) => {
    const [rol, setRol] = useState({
        name: "",
        permissions: [], // Lista de permisos seleccionados
        activo: true, // Estado del rol
    });

    const [generatedPermissions, setGeneratedPermissions] = useState([]); // Permisos generados dinámicamente
    const [selectedComponent, setSelectedComponent] = useState(""); // Componente seleccionado

    const handleChange = (e) => {
        setRol({
            ...rol,
            [e.target.name]: e.target.value,
        });
    };

    const handleComponentChange = (e) => {
        const component = e.target.value;
        setSelectedComponent(component);

        // Generar los permisos dinámicamente según el componente seleccionado
        if (component) {
            const permissions = PRIVILEGES.map((privilege) => ({
                resource: component,
                action: privilege.toLowerCase(), // Mantén el formato en minúsculas
            }));
            setGeneratedPermissions(permissions);
        } else {
            setGeneratedPermissions([]);
        }
    };

    const handleCheckboxChange = (permission) => {
        setRol((prev) => {
            const isSelected = prev.permissions.some(
                (perm) =>
                    perm.resource === permission.resource &&
                    perm.action === permission.action
            );

            const updatedPermissions = isSelected
                ? prev.permissions.filter(
                      (perm) =>
                          perm.resource !== permission.resource ||
                          perm.action !== permission.action
                  )
                : [...prev.permissions, permission];

            return { ...prev, permissions: updatedPermissions };
        });
    };

    const agregarRol = async (e) => {
        e.preventDefault();

        if (!rol.name || rol.permissions.length === 0) {
            Swal.fire("Error", "El nombre del rol y al menos un permiso son requeridos", "error");
            return;
        }

        try {
            const response = await clienteAxios.post("/roles", rol); // Enviar datos al backend
            Swal.fire("Rol Creado", response.data.message, "success");
            cerrarModal();
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudo crear el rol",
            });
        }
    };

    return (
        <form onSubmit={agregarRol}>
            <legend>Crear Nuevo Rol</legend>

            <div className="campo">
                <label>Nombre del Rol:</label>
                <input
                    type="text"
                    name="name"
                    placeholder="Nombre del rol"
                    onChange={handleChange}
                    value={rol.name}
                />
            </div>

            <div className="campo">
                <label>Componente:</label>
                <select value={selectedComponent} onChange={handleComponentChange}>
                    <option value="">Seleccione un componente</option>
                    {COMPONENTS.map((component) => (
                        <option key={component} value={component}>
                            {component}
                        </option>
                    ))}
                </select>
            </div>

            <div className="campo">
                <label>Permisos:</label>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    {generatedPermissions.map((permission, index) => (
                        <div key={index} style={{ marginBottom: "5px" }}>
                            <input
                                type="checkbox"
                                id={`permission-${permission.resource}-${permission.action}`}
                                checked={rol.permissions.some(
                                    (perm) =>
                                        perm.resource === permission.resource &&
                                        perm.action === permission.action
                                )}
                                onChange={() => handleCheckboxChange(permission)}
                            />
                            <label
                                htmlFor={`permission-${permission.resource}-${permission.action}`}
                                style={{ marginLeft: "5px" }}
                            >
                                {permission.resource} - {permission.action}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            <div className="campo">
                <label>Activo:</label>
                <input
                    type="checkbox"
                    name="activo"
                    checked={rol.activo}
                    onChange={(e) => setRol({ ...rol, activo: e.target.checked })}
                />
            </div>

            <div className="enviar">
                <input
                    type="submit"
                    className="btn btn-azul"
                    value="Guardar Rol"
                    disabled={!rol.name || rol.permissions.length === 0}
                />
            </div>
        </form>
    );
};

export default NuevoRol;
