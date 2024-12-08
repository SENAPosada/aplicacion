import React, { useState, useEffect, Fragment } from "react";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";
import clienteAxios from "../config/axios";

const COMPONENTS = ["usuarios", "roles", "horarios", "clientes", "tecnicos", "categorias", "repuestos", "servicios", "citas", "ventas"];
const PRIVILEGES = ["crear", "leer", "actualizar", "eliminar"];

function EditarRol() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [rol, setRol] = useState({
        name: "",
        description: "",
        permissions: [],
    });

    const [selectedComponent, setSelectedComponent] = useState("");
    const [generatedPermissions, setGeneratedPermissions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const consultarAPI = async () => {
            try {
                const rolResponse = await clienteAxios.get(`/roles/${id}`);
                const rolData = rolResponse.data;

                // Extraer el primer componente del conjunto de permisos (si existe)
                const initialComponent = rolData.permissions.length > 0 ? rolData.permissions[0].resource : "";

                setRol(rolData);
                setSelectedComponent(initialComponent);

                if (initialComponent) {
                    // Generar los permisos dinámicamente para el componente
                    const permissions = PRIVILEGES.map((privilege) => ({
                        id: `${initialComponent}-${privilege}`,
                        resource: initialComponent,
                        action: privilege,
                    }));
                    setGeneratedPermissions(permissions);
                }

                setLoading(false);
            } catch (error) {
                console.error("Error al consultar datos del rol:", error);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "No se pudieron cargar los datos del rol",
                });
                setLoading(false);
            }
        };

        consultarAPI();
    }, [id]);

    const actualizarRol = async (e) => {
        e.preventDefault();
        try {
            await clienteAxios.put(`/roles/${rol._id}`, rol);
            Swal.fire("Correcto", "El rol se actualizó correctamente", "success");
            navigate("/roles");
        } catch (error) {
            console.error("Error al actualizar el rol:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudo actualizar el rol",
            });
        }
    };

    const handleChange = (e) => {
        setRol({
            ...rol,
            [e.target.name]: e.target.value,
        });
    };

    const handleComponentChange = (e) => {
        const component = e.target.value;
        setSelectedComponent(component);

        if (component) {
            const permissions = PRIVILEGES.map((privilege) => ({
                id: `${component}-${privilege}`,
                resource: component,
                action: privilege,
            }));
            setGeneratedPermissions(permissions);
        } else {
            setGeneratedPermissions([]);
        }
    };

    const handlePermissionChange = (permission) => {
        setRol((prevState) => {
            const exists = prevState.permissions.find(
                (perm) => perm.resource === permission.resource && perm.action === permission.action
            );

            const updatedPermissions = exists
                ? prevState.permissions.filter(
                      (perm) => !(perm.resource === permission.resource && perm.action === permission.action)
                  )
                : [...prevState.permissions, permission];

            return { ...prevState, permissions: updatedPermissions };
        });
    };

    if (loading) {
        return <p>Cargando...</p>;
    }

    return (
        <Fragment>
            <h2>Editar Rol</h2>
            <form onSubmit={actualizarRol}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Nombre del Rol"
                        onChange={handleChange}
                        value={rol.name}
                    />
                </div>

                <div className="campo">
                    <label>Descripción:</label>
                    <input
                        type="text"
                        name="description"
                        placeholder="Descripción del Rol"
                        onChange={handleChange}
                        value={rol.description}
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
                    {generatedPermissions.length > 0 ? (
                        generatedPermissions.map((permission) => (
                            <div key={permission.id}>
                                <input
                                    type="checkbox"
                                    id={`permission-${permission.id}`}
                                    checked={rol.permissions.some(
                                        (perm) => perm.resource === permission.resource && perm.action === permission.action
                                    )}
                                    onChange={() => handlePermissionChange(permission)}
                                />
                                <label htmlFor={`permission-${permission.id}`}>
                                    {permission.resource} - {permission.action}
                                </label>
                            </div>
                        ))
                    ) : (
                        <p>No hay permisos disponibles para el componente seleccionado</p>
                    )}
                </div>

                <div className="enviar">
                    <input
                        type="submit"
                        className="btn btn-azul"
                        value="Guardar Cambios"
                        disabled={!rol.name || !rol.permissions.length}
                    />
                </div>
            </form>
        </Fragment>
    );
}

export default EditarRol;
