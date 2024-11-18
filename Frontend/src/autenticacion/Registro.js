import React, { useState, Fragment } from 'react';
import Swal from 'sweetalert2'; 
import clienteAxios from "../config/axios";
import { useNavigate } from "react-router-dom"; // Para redireccionar

const Registro = () => {
    const navigate = useNavigate(); // Habilitar redirección
    const [usuario, setUsuario] = useState({
        nombre: '',
        email: '',
        password: '',
        telefono: '',
        direccion: ''
    });

    const [loading, setLoading] = useState(false); // Estado de carga

    const handleChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        });
    };

    // Validar formulario
    const validarUsuario = () => {
        const { nombre, email, password, telefono, direccion } = usuario;
        // Puedes añadir más validaciones si es necesario
        return !nombre.length || !email.length || !password.length;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Activar carga
        try {
            const respuesta = await clienteAxios.post('/usuarios', usuario); // Ajusta la ruta según tu backend
            Swal.fire(
                'Registro Exitoso',
                respuesta.data.message,
                'success'
            );
            navigate('/'); // Redireccionar después de éxito
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response ? error.response.data.message : 'Error al registrar el usuario'
            });
        } finally {
            setLoading(false); // Desactivar carga
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
                    <button 
                        type="submit" 
                        className="btn btn-primary btn-block" 
                        disabled={validarUsuario() || loading}
                    >
                        {loading ? 'Registrando...' : 'Registrarse'}
                    </button>
                </form>
            </div>
        </Fragment>
    );
}

export default Registro