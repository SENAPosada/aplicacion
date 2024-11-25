import React, { useState, Fragment } from 'react';
import Swal from 'sweetalert2';
import clienteAxios from "../config/axios";
import { useNavigate } from "react-router-dom";

const Registro = () => {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState({
        nombres: '',
        apellidos: '',
        email: '',
        password: '',
        telefono: '',
        direccion: '',
    });

    const [confirmPassword, setConfirmPassword] = useState(''); // Estado para confirmación de contraseña
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value,
        });
    };

    const validarUsuario = () => {
        const { nombres, apellidos, email, password } = usuario;
        return !nombres.length || !apellidos.length || !email.length || !password.length || password !== confirmPassword;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const respuesta = await clienteAxios.post('/usuarios', usuario);
            Swal.fire('Registro Exitoso', respuesta.data.message, 'success');
            navigate('/');
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response ? error.response.data.message : 'Error al registrar el usuario',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Fragment>
            <div style={{ display: 'flex', height: '100vh' }}>
                {/* Sección izquierda con el formulario */}
                <div
                    style={{
                        width: '50%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        padding: '2rem',
                        backgroundColor: '#ffffff',
                        borderRadius: '15px',
                        boxShadow: '-2px 0 10px rgba(0, 0, 0, 0.1)',
                        maxWidth: '500px',
                        margin: '0 auto',
                    }}
                >
                    <h2
                        style={{
                            marginLeft: "2rem",
                            marginBottom: '2rem',
                            color: '#007bff',
                            textAlign: 'left',
                            fontSize: '3rem',
                        }}
                    >
                        <span style={{ display: 'block', fontSize: '4rem', color: '#0056b3' }}>Registro de usuario</span>
                    </h2>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Nombres</label>
                            <input
                                type="text"
                                name="nombres"
                                placeholder="Nombres"
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Apellidos</label>
                            <input
                                type="text"
                                name="apellidos"
                                placeholder="Apellidos"
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
                            <label>Confirmar Contraseña</label>
                            <input
                                type="password"
                                placeholder="Confirmar Contraseña"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="form-control"
                                required
                            />
                            {confirmPassword && usuario.password !== confirmPassword && (
                                <small style={{ color: 'red' }}>Las contraseñas no coinciden</small>
                            )}
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

                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={validarUsuario() || loading}
                                style={{
                                    backgroundColor: '#007bff',
                                    color: '#fff',
                                    fontWeight: 'bold',
                                    border: 'none',
                                    padding: '10px 20px',
                                    borderRadius: '5px',
                                    transition: 'background-color 0.3s ease',
                                }}
                                onMouseOver={(e) => (e.target.style.backgroundColor = '#0056b3')}
                                onMouseOut={(e) => (e.target.style.backgroundColor = '#007bff')}
                            >
                                {loading ? 'Registrando...' : 'Registrarse'}
                            </button>
                        </div>
                    </form>

                    <p style={{ marginTop: '1rem', textAlign: 'right' }}>
                        ¿Ya tienes cuenta?{' '}
                        <span
                            onClick={() => navigate('/login')}
                            style={{
                                color: '#007bff',
                                cursor: 'pointer',
                                textDecoration: 'underline',
                            }}
                        >
                            Inicia sesión aquí
                        </span>
                    </p>
                </div>

                {/* Sección derecha con la imagen */}
                <div
                    style={{
                        width: '50%',
                        backgroundImage: 'url("/images/foto4.jpg")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        borderRadius: '15px',
                    }}
                ></div>
            </div>
        </Fragment>
    );
};

export default Registro;
