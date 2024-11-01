import React, { useState } from 'react';
import clienteAxios from '../config/axios';

const Formulario = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async (email, password) => {
    try {
      const res = await clienteAxios.post('usuarios/login', { email, password });
       const token = res.data.token;
       const user = res.data.user;
       localStorage.setItem('token', token);
       localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.log(error);
    }
  };  

  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
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
