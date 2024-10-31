import React, { useState } from 'react';

const Formulario = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();

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
