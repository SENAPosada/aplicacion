import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Login = () => {
  const { login, userAuth } = useAuthContext();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  // Verificación del estado de autenticación
  useEffect(() => {
    const storedUser = localStorage.getItem('usuario');
    const storedAuth = localStorage.getItem('auth');
    
    if (storedUser && storedAuth === 'true') {
      navigate('/clientes');  // Si ya está autenticado, redirigir
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Llamada al login desde el contexto de autenticación
      await login(email, password);
      setError(null);  // Limpiar el error en caso de éxito

      // Redirigir según el rol del usuario
      if (userAuth?.role === 'Administrador') {
        navigate('/dashboard'); // Si es administrador, redirige al dashboard
      } else {
        navigate('/clientes'); // Si no, redirige a clientes
      }
    } catch (error) {
      setError('Credenciales incorrectas o no registrado');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh', // Altura de la pantalla completa
      }}
    >
      {/* Sección izquierda con la imagen */}
      <div
        style={{
          width: '50%', // Fijamos un ancho fijo para la imagen
          backgroundImage: 'url("/images/foto.jpg")', // Cambia por la ruta válida
          backgroundSize: 'cover',
          borderRadius: '15px',
          backgroundPosition: 'center',
        }}
      ></div>

      {/* Sección derecha con el formulario */}
      <div
        style={{
          width: '50%', // Mantener un ancho del 50% para el formulario
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start', // Cambiar a flex-start para alinear arriba
          padding: '2rem',
          backgroundColor: '#ffffff',
          borderRadius: '15px',
          boxShadow: '-2px 0 10px rgba(0, 0, 0, 0.1)',
          maxWidth: '500px', // Limitar el ancho máximo del formulario
          margin: '0 auto', // Centrar el formulario
        }}
      >
        {/* Imagen del logo */}
        <div style={{ textAlign: 'left', marginBottom: '8rem' }}>
          <img
            src="/images/foto3.png" // Asegúrate de colocar la ruta correcta del logo
            alt="Logo"
            style={{ width: '300px', height: 'auto', marginTop: '0' }} // Sin margen superior para pegarlo arriba
          />
        </div>

        {/* Título */}
        <h2
          style={{
            marginLeft: '2rem',
            marginBottom: '2rem',
            color: '#007bff', // Cambia el color aquí si quieres algo más fuerte
            textAlign: 'left',
            fontSize: '3rem',
          }}
        >
          <span style={{ display: 'block', fontSize: '7rem', color: '#0056b3' }}>¡Hola,</span>
          <span style={{ display: 'block', fontSize: '4rem', color: '#0056b3' }}>Bienvenido!</span>
        </h2>

        {/* Formulario de inicio de sesión */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label
              htmlFor="email"
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#333',
              }}
            >
              Correo electrónico:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%', // Ajustamos el ancho a 100%
                padding: '0.75rem',
                border: '1px solid #ccc',
                borderRadius: '4px',
              }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label
              htmlFor="password"
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#333',
              }}
            >
              Contraseña:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%', // Ajustamos el ancho a 100%
                padding: '0.75rem',
                border: '1px solid #ccc',
                borderRadius: '4px',
              }}
            />
          </div>

          {error && (
            <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>
          )}

          {/* Botones de iniciar sesión y registrarse */}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button
              type="submit"
              style={{
                width: '48%',
                padding: '0.75rem',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Acceder
            </button>
            <button
              type="button"
              onClick={() => navigate('/registro')}
              style={{
                width: '48%',
                padding: '0.75rem',
                backgroundColor: '#6c757d',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Registrarse
            </button>
          </div>
        </form>

        {/* Enlace de restablecer contraseña */}
        <p style={{ marginTop: '1rem', textAlign: 'right' }}>
          <span
            onClick={() => navigate('/restablecer-password')}
            style={{
              color: '#007bff',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            ¿Perdió su contraseña?
          </span>
        </p>

        {/* Parte inferior con íconos de redes sociales */}
        <div
          style={{
            marginTop: '2rem',
            display: 'flex', // Usamos flexbox para alinear los elementos
            alignItems: 'center', // Alineamos los elementos verticalmente al centro
            justifyContent: 'center', // Centra los elementos horizontalmente
          }}
        >
          <p style={{ marginRight: '1rem', marginBottom: 0 }}>Síguenos</p> {/* Coloca el texto "Síguenos" a la izquierda */}
          <div style={{ fontSize: '1.5rem' }}>
            <a
              href="https://www.facebook.com/omniquimicamed"
              style={{
                margin: '0 1rem',
                color: '#007bff',
                textDecoration: 'none',
              }}
            >
              <FaFacebook />
            </a>
            <a
              href="https://x.com/omniquimica"
              style={{
                margin: '0 1rem',
                color: '#007bff',
                textDecoration: 'none',
              }}
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.instagram.com/omniquimica/"
              style={{
                margin: '0 1rem',
                color: '#007bff',
                textDecoration: 'none',
              }}
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
