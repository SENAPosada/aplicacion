import React, { useState, useEffect, Fragment } from "react";
import clienteAxios from "../config/axios"; // Asegúrate de que esté configurado correctamente
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const NuevoUsuario = () => {
    const navigate = useNavigate();

    const [usuario, guardarUsuario] = useState({
        nombres: "",
        apellidos: "",
        email: "",
        telefono: "",
        password: "",
        confirmarPassword: "",
        role: "", // Inicialmente vacío
        direccion: "",
        estado: "activo",
    });

    const [roles, setRoles] = useState([]); // Estado para los roles disponibles

    // Cargar los roles al montar el componente
    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const token = localStorage.getItem("token"); // Obtener el token
                const response = await clienteAxios.get("/roles", {
                    headers: {
                        Authorization: `Bearer ${token}`, // Incluir el token en los encabezados
                    },
                });
                setRoles(response.data); // Guardar los roles en el estado
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "No se pudo cargar la lista de roles",
                });
            }
        };

        fetchRoles();
    }, []);

    // Manejar cambios en los inputs
    const handleChange = (e) => {
        guardarUsuario({
            ...usuario,
            [e.target.name]: e.target.value,
        });
    };

    const agregarUsuario = async (e) => {
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
            const token = localStorage.getItem("token"); // Obtener el token
            const response = await clienteAxios.post("/usuarios", usuario, {
                headers: {
                    Authorization: `Bearer ${token}`, // Incluir el token en los encabezados
                },
            });
            Swal.fire("Usuario Agregado", response.data.mensaje, "success");
            navigate("/usuarios");
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudo agregar el usuario",
            });
        }
    };

    return (
        <Fragment>
            <h2>Nuevo Usuario</h2>
            <form onSubmit={agregarUsuario}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input
                        type="text"
                        name="nombres"
                        placeholder="Nombre del Usuario"
                        onChange={handleChange}
                    />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input
                        type="text"
                        name="apellidos"
                        placeholder="Apellido del Usuario"
                        onChange={handleChange}
                    />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email del Usuario"
                        onChange={handleChange}
                    />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input
                        type="tel"
                        name="telefono"
                        placeholder="Teléfono del Usuario"
                        onChange={handleChange}
                    />
                </div>

                <div className="campo">
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Contraseña del Usuario"
                        onChange={handleChange}
                    />
                </div>

                <div className="campo">
                    <label>Confirmar Contraseña:</label>
                    <input
                        type="password"
                        name="confirmarPassword"
                        placeholder="Confirma la contraseña"
                        onChange={handleChange}
                    />
                </div>

                <div className="campo">
                    <label>Dirección:</label>
                    <input
                        type="text"
                        name="direccion"
                        placeholder="Dirección del Usuario"
                        onChange={handleChange}
                    />
                </div>

                <div className="campo">
                    <label>Estado:</label>
                    <select name="estado" onChange={handleChange} value={usuario.estado}>
                        <option value="activo">Activo</option>
                        <option value="inactivo">Inactivo</option>
                    </select>
                </div>

                <div className="campo">
                    <label>Rol:</label>
                    <select name="role" onChange={handleChange} value={usuario.role}>
                        <option value="">Seleccione un rol</option>
                        {roles.map((role) => (
                            <option key={role._id} value={role.name}>
                                {role.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="enviar">
                    <input
                        type="submit"
                        className="btn btn-azul"
                        value="Agregar Usuario"
                        disabled={!usuario.nombres || !usuario.role}
                    />
                </div>
            </form>
        </Fragment>
    );
};

export default NuevoUsuario;
