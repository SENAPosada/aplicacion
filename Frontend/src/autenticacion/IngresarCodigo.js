import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import clienteAxios from "../config/axios";

const IngresarCodigo = () => {
    const [codigo, setCodigo] = useState('');
    const [nuevaContraseña, setNuevaContraseña] = useState('');
    const [confirmarContraseña, setConfirmarContraseña] = useState('');
    const navigate = useNavigate();

    // Recuperar el email desde sessionStorage
    const emailRecuperacion = sessionStorage.getItem('emailRecuperacion');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (nuevaContraseña !== confirmarContraseña) {
            Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
            return;
        }

        try {
            const respuesta = await clienteAxios.post('/usuarios/restablecer-password', {
                email: emailRecuperacion, // Enviar el email recuperado
                codigo,
                nuevaPassword: nuevaContraseña
            });

            Swal.fire('Éxito', respuesta.data.message, 'success');
            sessionStorage.removeItem('emailRecuperacion'); // Limpiar el email tras éxito
            navigate('/login');
        } catch (error) {
            Swal.fire('Error', error.response?.data?.message || 'No se pudo procesar la solicitud', 'error');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto' }}>
            <h2>Restablecer Contraseña</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="codigo">Código de recuperación:</label>
                    <input
                        type="text"
                        id="codigo"
                        value={codigo}
                        onChange={(e) => setCodigo(e.target.value)}
                        required
                        style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                    />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="nuevaContraseña">Nueva Contraseña:</label>
                    <input
                        type="password"
                        id="nuevaContraseña"
                        value={nuevaContraseña}
                        onChange={(e) => setNuevaContraseña(e.target.value)}
                        required
                        style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                    />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="confirmarContraseña">Confirmar Contraseña:</label>
                    <input
                        type="password"
                        id="confirmarContraseña"
                        value={confirmarContraseña}
                        onChange={(e) => setConfirmarContraseña(e.target.value)}
                        required
                        style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                    />
                </div>
                <button type="submit" style={{ width: '100%', padding: '0.5rem', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>
                    Restablecer Contraseña
                </button>
            </form>
        </div>
    );
};

export default IngresarCodigo;
