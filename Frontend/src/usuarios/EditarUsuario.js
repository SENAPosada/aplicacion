import React, { useState, useEffect, Fragment } from "react";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";
import clienteAxios from "../config/axios";

function EditarUsuario() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [usuario, datosUsuario] = useState({
        nombres: "",
        apellidos: "",
        email: "",
        telefono: "",
        rol: "",
    });

    const consultarAPI = async () => {
        try {
            const usuarioConsulta = await clienteAxios.get(`/usuarios/${id}`);
            datosUsuario(usuarioConsulta.data);
        } catch (error) {
            console.error("Error al cargar usuario", error);
        }
    };

    const actualizarUsuario = async (e) => {
        e.preventDefault();
        try {
            await clienteAxios.put(`/usuarios/${usuario._id}`, usuario);
            Swal.fire("Correcto", "Usuario actualizado con éxito", "success");
            navigate("/usuarios");
        } catch (error) {
            Swal.fire("Error", "No se pudo actualizar el usuario", "error");
        }
    };

    useEffect(() => {
        consultarAPI();
    }, []);

    const handleChange = (e) => {
        datosUsuario({
            ...usuario,
            [e.target.name]: e.target.value,
        });
    };

    const validarUsuario = () => {
        const { nombres, apellidos, email, telefono, rol } = usuario;
        return !nombres || !apellidos || !email || !telefono || !rol;
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
                        placeholder="nombres"
                        name="nombres"
                        onChange={handleChange}
                        value={usuario.nombre}
                    />
                </div>

                <div className="campo">
                    <label>Apellidos:</label>
                    <input
                        type="text"
                        placeholder="Apellido Usuario"
                        name="apellidos"
                        onChange={handleChange}
                        value={usuario.apellido}
                    />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input
                        type="email"
                        placeholder="Email Usuario"
                        name="email"
                        onChange={handleChange}
                        value={usuario.email}
                    />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input
                        type="tel"
                        placeholder="Teléfono Usuario"
                        name="telefono"
                        onChange={handleChange}
                        value={usuario.telefono}
                    />
                </div>

                <div className="campo">
                    <label>Rol:</label>
                    <select
                        name="rol"
                        onChange={handleChange}
                        value={usuario.rol}
                    >
                        <option value="">-- Selecciona un Rol --</option>
                        <option value="Administrador">Administrador</option>
                        <option value="Usuario">Usuario</option>
                    </select>
                </div>

                <div className="enviar">
                    <input
                        type="submit"
                        className="btn btn-azul"
                        value="Guardar Cambios"
                        disabled={validarUsuario()}
                    />
                </div>
            </form>
        </Fragment>
    );
}

export default EditarUsuario;
