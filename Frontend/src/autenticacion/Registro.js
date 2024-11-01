import React, { useState, Fragment } from 'react';
import Swal from 'sweetalert2'; 
import clienteAxios from "../config/axios";
import { useNavigate } from "react-router-dom"; // Para redireccionar

function RegistroUsuario() {
    // const navigate = useNavigate(); 
    const [usuario, setUsuario] = useState({
        nombre: '',
        email: '',
        password: '',
        telefono: '',
        direccion: ''
    });

    const handleChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        });
    };

    // Validar formulario
    const validarUsuario = () => {
        const { nombre, email, password, telefono, direccion } = usuario;
        let valido = !nombre.length || !email.length || !password.length;
        return valido;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const respuesta = await clienteAxios.post('/usuarios', usuario); // Ajusta la ruta según tu backend
            Swal.fire(
                'Registro Exitoso',
                respuesta.data.message,
                'success'
            );
            // navigate('/'); 
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: "Error al registrar el usuario"
            });
        }
    };

    return (
        <Fragment>
            <div className="registro-container">
                <h2 className="registro-titulo">Registro de Usuario</h2>
                <form onSubmit={handleSubmit} className="registro-form">
                    <div className="form-group">
                        <label>Nombre</label>
                        <input 
                            type="text" 
                            name="nombre" 
                            placeholder="Nombre" 
                            onChange={handleChange} 
                            className="form-control"
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="Email" 
                            onChange={handleChange} 
                            className="form-control"
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Contraseña</label>
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="Contraseña" 
                            onChange={handleChange} 
                            className="form-control"
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Teléfono</label>
                        <input 
                            type="text" 
                            name="telefono" 
                            placeholder="Teléfono" 
                            onChange={handleChange} 
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Dirección</label>
                        <input 
                            type="text" 
                            name="direccion" 
                            placeholder="Dirección" 
                            onChange={handleChange} 
                            className="form-control"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block" disabled={validarUsuario()}>Registrarse</button>
                </form>
            </div>
        </Fragment>
    );
}

export default RegistroUsuario;
