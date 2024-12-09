import React, { useState, useEffect, Fragment } from "react";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";
import clienteAxios from "../config/axios";

function EditarUsuario() {
    const navigate = useNavigate();
    const { id } = useParams(); // Obtén el ID del usuario de la URL

    const [usuario, datosUsuario] = useState({
        nombres: "",
        apellidos: "",
        email: "",
        telefono: "",
        role: "", // Al principio vacío
        direccion: "",
        activo: true
    });

    const [roles, setRoles] = useState([]); // Estado para almacenar los roles disponibles

    // Función para cargar los roles y el usuario
    const consultarAPI = async () => {
        try {
            // Obtener el usuario por ID
            const usuarioConsulta = await clienteAxios.get(`/usuarios/${id}`);
            datosUsuario(usuarioConsulta.data);

            // Obtener los roles disponibles
            const rolesResponse = await clienteAxios.get("/roles");
            setRoles(rolesResponse.data); // Guardar los roles en el estado
        } catch (error) {
            console.error("Error al cargar usuario o roles", error);
            Swal.fire("Error", "No se pudo cargar los datos del usuario o roles", "error");
        }
    };

    useEffect(() => {
        consultarAPI(); // Llamar a la API para cargar los datos del usuario y roles
    }, [id]);

    const handleChange = (e) => {
        datosUsuario({
            ...usuario,
            [e.target.name]: e.target.value,
        });
    };

    const actualizarUsuario = async (e) => {
        e.preventDefault();

        // Verificar si las contraseñas coinciden
        if (usuario.password !== usuario.confirmarPassword) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Las contraseñas no coinciden",
            });
            return;
        }

        try {
            // Enviar la solicitud PUT para actualizar el usuario
            const response = await clienteAxios.put(`/usuarios/${usuario._id}`, usuario);
            Swal.fire("Correcto", "Usuario actualizado con éxito", "success");
            navigate("/usuarios"); // Redirigir a la lista de usuarios
        } catch (error) {
            Swal.fire("Error", "No se pudo actualizar el usuario", "error");
        }
    };

    const validarUsuario = () => {
        const { nombres, apellidos, email, telefono, role } = usuario;
        return !nombres || !apellidos || !email || !telefono || !role;
    };

    return (
        <Fragment>
            <h2>Editar Usuario</h2>
            <form onSubmit={actualizarUsuario}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombres:</label>
                    <input
                        type="text"
                        placeholder="Nombres"
                        name="nombres"
                        onChange={handleChange}
                        value={usuario.nombres} // Usar el valor del estado
                    />
                </div>

                <div className="campo">
                    <label>Apellidos:</label>
                    <input
                        type="text"
                        placeholder="Apellidos"
                        name="apellidos"
                        onChange={handleChange}
                        value={usuario.apellidos} // Usar el valor del estado
                    />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        onChange={handleChange}
                        value={usuario.email} // Usar el valor del estado
                    />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input
                        type="tel"
                        placeholder="Teléfono"
                        name="telefono"
                        onChange={handleChange}
                        value={usuario.telefono} // Usar el valor del estado
                    />
                </div>

                <div className="campo">
                    <label>Rol:</label>
                    <select
                        name="role"
                        onChange={handleChange}
                        value={usuario.role} // Usar el valor del estado
                    >
                        <option value="">-- Selecciona un Rol --</option>
                        {roles.map((role) => (
                            <option key={role._id} value={role._id}> {/* Usamos el _id como valor */}
                                {role.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="campo">
                    <label>Estado:</label>
                    <select
                        name="activo"
                        onChange={handleChange}
                        value={usuario.activo}
                    >
                        <option value={true}>Activo</option>
                        <option value={false}>Inactivo</option>
                    </select>
                </div>

                <div className="campo">
                    <label>Dirección:</label>
                    <input
                        type="text"
                        placeholder="Dirección"
                        name="direccion"
                        onChange={handleChange}
                        value={usuario.direccion} // Usar el valor del estado
                    />
                </div>

                <div className="enviar">
                    <input
                        type="submit"
                        className="btn btn-azul"
                        value="Guardar Cambios"
                        disabled={validarUsuario()} // Deshabilitar si el formulario no es válido
                    />
                </div>
            </form>
        </Fragment>
    );
}

export default EditarUsuario;
