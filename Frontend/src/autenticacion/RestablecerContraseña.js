import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';  // Importar useNavigate para redirigir
import clienteAxios from "../config/axios";

const RestablecerContraseña = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();  // Usamos navigate para redirigir después de enviar el código

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const respuesta = await clienteAxios.post('/usuarios/restablecer-password', { email });
            Swal.fire('Éxito', respuesta.data.message, 'success');
    
            // Almacenar el email en sessionStorage
            sessionStorage.setItem('emailRecuperacion', email);
    
            // Redirigir a la página donde se ingresa el código
            navigate('/restablecer-password/codigo');
        } catch (error) {
            Swal.fire('Error', error.response?.data?.message || 'No se pudo procesar la solicitud', 'error');
        }
    };
    

    return (
        <div style={{ maxWidth: '400px', margin: 'auto' }}>
            <h2>Restablecer Contraseña</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="email">Correo electrónico:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                    />
                </div>
                <button type="submit" style={{ width: '100%', padding: '0.5rem', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>
                    Enviar código
                </button>
            </form>
        </div>
    );
};

export default RestablecerContraseña;
