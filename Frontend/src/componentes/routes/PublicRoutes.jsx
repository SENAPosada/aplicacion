import React from 'react'
import { useAuthContext } from '../../contexts/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

function PublicRoutes() {
  const { isAuthenticated } = useAuthContext()

  console.log(typeof isAuthenticated);

  if(Boolean(isAuthenticated)) {
   return <Navigate to="/clientes" />
  }

  return (
    <Outlet />
  )

}

export default PublicRoutes