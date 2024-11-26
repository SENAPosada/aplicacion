import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Header from '../layout/Header';
import Navegacion from '../layout/Navegacion';
import { useAuthContext } from '../../contexts/AuthContext'

function EditorRoutes(allowedRoles) {

    const { isAuthenticated, userAuth } = useAuthContext()


    if (Boolean(isAuthenticated) === false) {
        return <Navigate to="/login" />
    }

    const hasPermission = userAuth.roles.some(role => allowedRoles.includes(role));
    if (!hasPermission) {
        return <Navigate to="/admin" />;
    }


  return (
    <>
      <Header />
      <div className="grid contenedor contenido-principal">
        <Navegacion />
        <main className="caja-contenido col-9">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default EditorRoutes;
