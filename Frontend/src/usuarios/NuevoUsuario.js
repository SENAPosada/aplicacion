import React, { useState, Fragment } from "react";
import Swal from "sweetalert2";
// para redireccionar
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/axios"; // Asegúrate de tener un archivo axios configurado

function NuevoUsuario() {
    // Hook para redireccionar
    const navigate = useNavigate();

    const [usuario, guardarUsuario] = useState({
        nombres: "",
        apellidos: "",
        email: "",
        telefono: "",
        password: "",
        confirmarPassword: "", // Campo para confirmar la contraseña
        role: "usuario",  // Por defecto se asigna 'usuario', puedes cambiar según el caso
        direccion: "",
        estado: "activo" // Por defecto 'activo'
    });

    // Leer datos del formulario
    const handleChange = e => {
        // Almacenar lo que el usuario escribe en el state
        guardarUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        });
    };

    // Añadir un nuevo usuario a la base de datos
    const agregarUsuario = e => {
        e.preventDefault();
        // Verificar si las contraseñas coinciden
        if (usuario.password !== usuario.confirmarPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Las contraseñas no coinciden',
                text: 'Por favor, asegúrate de que las contraseñas sean iguales.'
            });
            return;
        }

        // Enviar petición
        clienteAxios.post('/usuarios', usuario)
            .then(res => {
                if (res.data.code === 11000) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Hubo un error',
                        text: 'El usuario ya está registrado'
                    });
                } else {
                    Swal.fire(
                        'Usuario Agregado',
                        res.data.mensaje,
                        'success'
                    );
                }
                // redireccionar
                navigate('/usuarios');
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un problema al agregar el usuario'
                });
            });
    };

    // Validar formulario
    const validarUsuario = () => {
        const { nombres, apellidos, email, password, confirmarPassword } = usuario;
        let valido = !nombres.length || !apellidos.length || !email.length || !password.length || !confirmarPassword.length;
        return valido || password !== confirmarPassword;  // Deshabilitar si las contraseñas no coinciden
    };

    return (
        <Fragment>
            <h2>Nuevo Usuario</h2>
            <form onSubmit={agregarUsuario}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text"
                        placeholder="Nombre del Usuario"
                        name="nombres"
                        onChange={handleChange}
                    />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input type="text"
                        placeholder="Apellido del Usuario"
                        name="apellidos"
                        onChange={handleChange}
                    />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input type="email"
                        placeholder="Email del Usuario"
                        name="email"
                        onChange={handleChange}
                    />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input type="tel"
                        placeholder="Teléfono del Usuario"
                        name="telefono"
                        onChange={handleChange}
                    />
                </div>

                <div className="campo">
                    <label>Contraseña:</label>
                    <input type="password"
                        placeholder="Contraseña del Usuario"
                        name="password"
                        onChange={handleChange}
                    />
                </div>

                <div className="campo">
                    <label>Confirmar Contraseña:</label>
                    <input type="password"
                        placeholder="Confirma la contraseña"
                        name="confirmarPassword"
                        onChange={handleChange}
                    />
                </div>

                <div className="campo">
                    <label>Dirección:</label>
                    <input type="text"
                        placeholder="Dirección del Usuario"
                        name="direccion"
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
                    <label>Role:</label>
                    <select name="role" onChange={handleChange} value={usuario.role}>
                        <option value="usuario">Usuario</option>
                        <option value="admin">Administrador</option>
                    </select>
                </div>

                <div className="enviar">
                    <input
                        type="submit"
                        className="btn btn-azul"
                        value="Agregar Usuario"
                        disabled={validarUsuario()}
                    />
                </div>
            </form>
        </Fragment>
    );
}

export default NuevoUsuario;
