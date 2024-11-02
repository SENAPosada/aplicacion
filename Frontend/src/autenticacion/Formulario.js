import React, { useState } from 'react';
import clienteAxios from '../config/axios';
import { useNavigate } from'react-router-dom';

const Formulario = () => {

  const navigate = useNavigate();
  // Definimos el estado local para el formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async (email, password) => {
    try {
  
      const { data } = await clienteAxios.post('usuarios/login', { email, password });

      localStorage.setItem('token', data.token); // Guardamos el token en el local storage
      localStorage.setItem('usuario', JSON.stringify(data.usuario)); // Guardamos el usuario en el local storage

       navigate('/'); // Redireccionamos a la página de inicio
      console.log('Sesión iniciada correctamente');
    } catch (error) {
      console.error('Error al iniciar sesión:', error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem('token'); // Eliminamos el token del local storage
    localStorage.removeItem('usuario'); // Eliminamos el usuario del local storage
    navigate('/login'); // Redireccionamos a la página de login
  }
  

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar los datos al backend¿
    login(email, password);

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
        <button type="submit" style={{ width: '100%', padding: '0.5rem', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default Formulario;
