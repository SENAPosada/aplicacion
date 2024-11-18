import React, { useState } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate para redirigir

const Login = () => {
    const { login } = useAuthContext();
    const navigate = useNavigate(); // Hook para redirigir
  
    // Definimos el estado local para el formulario
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null); // Estado para manejar errores
  
    // Maneja el envío del formulario
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        await login(email, password); // Intentamos hacer login
        setError(null); // Si el login es exitoso, limpiamos el error
  
        // Si el login es exitoso, puedes redirigir a otra página (como el dashboard o home)
        navigate('/clientes'); // Redirige a una página protegida
      } catch (error) {
        setError('Credenciales incorrectas o no registrado'); // Manejar error en caso de fallo
        // Si las credenciales son incorrectas, redirigimos al usuario al formulario de registro
        navigate('/registro'); // Cambia '/registro' por la ruta del formulario de registro
      }
    };
  
    return (
      <div style={{ maxWidth: '400px', margin: 'auto' }}>
        <h2>Iniciar Sesión</h2>
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
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </div>
  
          {error && <p style={{ color: 'red' }}>{error}</p>} {/* Muestra el error si existe */}
  
          <button type="submit" style={{ width: '100%', padding: '0.5rem', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>
            Iniciar Sesión
          </button>
        </form>
  
        <p style={{ marginTop: '1rem', textAlign: 'center' }}>
          ¿No tienes cuenta? 
          <button onClick={() => navigate('/registro')} style={{ background: 'none', color: '#007bff', border: 'none', cursor: 'pointer' }}>
            Regístrate aquí
          </button>
        </p>

        {/* Enlace de restablecer contraseña */}
        <p style={{ marginTop: '1rem', textAlign: 'center' }}>
          ¿Olvidaste tu contraseña? 
          <button onClick={() => navigate('/restablecer-password')} style={{ background: 'none', color: '#007bff', border: 'none', cursor: 'pointer' }}>
            Restablecer contraseña
          </button>
        </p>
      </div>
    );
};

export default Login;
