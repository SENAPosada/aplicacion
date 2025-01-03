import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// Layout
import Header from "./componentes/layout/Header";
import Navegacion from "./componentes/layout/Navegacion";
// Componentes
import Clientes from "./componentes/clientes/Clientes";
import NuevoCliente from "./componentes/clientes/NuevoCliente";
import EditarCliente from "./componentes/clientes/EditarCliente";
import Tecnicos from "./componentes/tecnicos/Tecnicos";
import NuevoTecnico from "./componentes/tecnicos/NuevoTecnico";
import EditarTecnico from "./componentes/tecnicos/EditarTecnico";
import Categorias from "./componentes/categorias/Categorias";
import NuevaCategoria from "./componentes/categorias/NuevaCategoria";
import EditarCategoria from "./componentes/categorias/EditarCategoria";
import Repuestos from "./componentes/repuestos/Repuestos";
import NuevoRepuesto from "./componentes/repuestos/NuevoRepuesto";
import EditarRepuesto from "./componentes/repuestos/EditarRepuesto";
import Servicios from "./componentes/servicios/Servicios";
import NuevoServicio from "./componentes/servicios/NuevoServicio";
import EditarServicio from "./componentes/servicios/EditarServicio";
import Citas from "./componentes/Citas/Citas";
import NuevaCita from "./componentes/Citas/NuevaCita";
import EditarCita from "./componentes/Citas/EditarCita";
import Agenda from "./componentes/horarios/Agenda";
import CrearDisponibilidad from "./componentes/horarios/CrearDisponibilidad";
import NuevaVenta from "./componentes/ventas/NuevaVenta";
import Dashboard from "./componentes/Dashboard/Dashboard";
import Ventas from "./componentes/ventas/ventas";

import PublicRoutes from "./componentes/routes/PublicRoutes";
import AdminRoutes from "./componentes/routes/AdminRoutes";
import Registro from "./autenticacion/Registro";
import Login from "./autenticacion/Login";
import RestablecerContraseña from "./autenticacion/RestablecerContraseña";
import IngresarCodigo from "./autenticacion/IngresarCodigo";
import Usuarios from "./usuarios/Usuarios";
import NuevoUsuario from "./usuarios/NuevoUsuario";
import EditarUsuario from "./usuarios/EditarUsuario";

import 'primereact/resources/themes/lara-light-indigo/theme.css';  // Tema de PrimeReact
import 'primereact/resources/primereact.min.css'; // Estilos de los componentes
import 'primeicons/primeicons.css'; // Iconos de PrimeReact
import Roles from "./roles/Roles";
import Permissions from "./roles_por_permiso/Permissions";
import EditarRol from "./roles/EditarRol";
import NewPermission from "./roles_por_permiso/NewPermission";

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/login" element={<PublicRoutes />}>
          <Route index element={<Login />} />
        </Route>

        <Route path="/registro" element={<PublicRoutes />}>
          <Route index element={<Registro />} />
        </Route>

        <Route path="/restablecer-password" element={<PublicRoutes />}>
          <Route index element={<RestablecerContraseña />} />
        </Route>

        <Route path="/restablecer-password/codigo" element={<PublicRoutes />}>
          <Route index element={<IngresarCodigo />} />
        </Route>

        {/* Rutas Protegidas */}
        <Route path="/" element={<AdminRoutes />}>
          <Route path="dashboard" element={<Dashboard />} />

          {/* Usuarios */}
          <Route path="usuarios" element={<Usuarios />} />
          <Route path="usuarios/nuevo" element={<NuevoUsuario />} />
          <Route path="usuarios/editar/:id" element={<EditarUsuario />} />

          {/* Roles */}
          <Route path="roles" element={<Roles />} />
          <Route path="roles/editar/:id" element={<EditarRol />} />

          <Route path="permissions" element={<Permissions />} />
          <Route path="permissions/nuevo" element={<NewPermission />} />
          <Route path="permissions/editar/:id" element={<EditarRol />} />

          {/* Asignación de Permisos por Rol */}
          {/* <Route path="roles/asignar-permisos/:id" element={<AsignarPermisos />} /> Nueva ruta para asignar permisos */}

          <Route path="horarios" element={<Agenda />} />
          <Route path="horarios/nuevo" element={<CrearDisponibilidad />} />
          
          {/* Clientes */}
          <Route path="clientes" element={<Clientes />} />
          <Route path="clientes/nuevo" element={<NuevoCliente />} />
          <Route path="clientes/editar/:id" element={<EditarCliente />} />

          {/* Técnicos */}
          <Route path="tecnicos" element={<Tecnicos />} />
          <Route path="tecnicos/nuevo" element={<NuevoTecnico />} />
          <Route path="tecnicos/editar/:id" element={<EditarTecnico />} />

          {/* Categorías */}
          <Route path="categorias" element={<Categorias />} />
          <Route path="categorias/nuevo" element={<NuevaCategoria />} />
          <Route path="categorias/editar/:id" element={<EditarCategoria />} />

          {/* Repuestos */}
          <Route path="repuestos" element={<Repuestos />} />
          <Route path="repuestos/nuevo" element={<NuevoRepuesto />} />
          <Route path="repuestos/editar/:id" element={<EditarRepuesto />} />

          {/* Servicios */}
          <Route path="servicios" element={<Servicios />} />
          <Route path="servicios/nuevo" element={<NuevoServicio />} />
          <Route path="servicios/editar/:id" element={<EditarServicio />} />

          {/* Citas */}
          <Route path="citas" element={<Citas />} />
          <Route path="citas/nueva" element={<NuevaCita />} />
          <Route path="citas/editar/:id" element={<EditarCita />} />

          {/* Ventas */}
          <Route path="ventas" element={<Ventas />} />
          <Route path="ventas/nueva" element={<NuevaVenta />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
