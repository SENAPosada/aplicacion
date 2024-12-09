import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';

const Navegacion = () => {
  const [showConfiguracion, setShowConfiguracion] = useState(false);
  const [showAgendamiento, setShowAgendamiento] = useState(false);
  const [showServicios, setShowServicios] = useState(false);
  const [showVentas, setShowVentas] = useState(false);

  const toggleConfiguracion = () => setShowConfiguracion(!showConfiguracion);
  const toggleAgendamiento = () => setShowAgendamiento(!showAgendamiento);
  const toggleServicios = () => setShowServicios(!showServicios);
  const toggleVentas = () => setShowVentas(!showVentas);

  const { logout } = useAuthContext();

  return (
    <div className="sidebar-container">
      <aside className="sidebar">
        <h2>Administración</h2>
        <nav className="navegacion">
          {/* Dashboard */}
          <Link to={"/dashboard"} className="dashboard">
            <i className="fa-solid fa-chart-line"></i> Dashboard
          </Link>

          {/* Configuración dropdown */}
          <div>
            <Link to="#" onClick={toggleConfiguracion} className="configuracion">
              <i className="fa-solid fa-gear"></i> Configuración <span>{showConfiguracion ? "▲" : "▼"}</span>
            </Link>
            {showConfiguracion && (
              <div className="dropdown">
                <Link to={"/usuarios"} className="usuario-item">
                  <i className="fa-solid fa-user"></i> Usuarios
                </Link>
                <Link to={"/roles"} className="role-item">
                  <i className="fa-solid fa-user-shield"></i> Roles
                </Link>
                {/* <Link to={"/permissions"} className="permisos-item">
                  <i className="fa-solid fa-lock"></i> Permisos
                </Link> */}
                {/* <Link to={"/roles/asignar-permisos"} className="asignar-permisos-item">
                  <i className="fa-solid fa-key"></i> Asignar Permisos a Roles
                </Link> Nueva ruta para asignar permisos */}
              </div>
            )}
          </div>

          {/* Agendamiento dropdown */}
          <div>
            <Link to="#" onClick={toggleAgendamiento} className="agendamiento">
              <i className="fa-solid fa-calendar-days"></i> Agendamiento <span>{showAgendamiento ? "▲" : "▼"}</span>
            </Link>
            {showAgendamiento && (
              <div className="dropdown">
                <Link to={"/clientes"} className="clientes-item">
                  <i className="fa-solid fa-users"></i> Clientes
                </Link>
                <Link to={"/calendario"} className="clientes-item">
                  <i className="fa-solid fa-clock"></i> Agenda
                </Link>
                <Link to={"/turnos"} className="clientes-item">
                  <i className="fa-solid fa-clock"></i> Turnos
                </Link>
                <Link to={"/horarios"} className="horarios-item">
                  <i className="fa-solid fa-clock"></i> Horarios
                </Link>
                <Link to={"/tecnicos"} className="tecnico-item">
                  <i className="fa-solid fa-screwdriver-wrench"></i> Técnicos
                </Link>
                <Link to={"/citas"} className="cita-item">
                  <i className="fa-solid fa-calendar-check"></i> Citas
                </Link>
              </div>
            )}
          </div>

          {/* Servicios dropdown */}
          <div>
            <Link to="#" onClick={toggleServicios} className="servicios">
              <i className="fa-solid fa-concierge-bell"></i> Servicios <span>{showServicios ? "▲" : "▼"}</span>
            </Link>
            {showServicios && (
              <div className="dropdown">
                <Link to={"/categorias"} className="categoria-item">
                  <i className="fa-solid fa-layer-group"></i> Servicios
                </Link>
                <Link to={"/servicios"} className="servicio-item">
                  <i className="fa-solid fa-concierge-bell"></i> Categorias
                </Link>
                <Link to={"/repuestos"} className="repuestos-item">
                  <i className="fa-solid fa-tools"></i> Repuestos
                </Link>
              </div>
            )}
          </div>

          {/* Ventas dropdown */}
          <div>
            <Link to="#" onClick={toggleVentas} className="ventas">
              <i className="fa-solid fa-dollar-sign"></i> Ventas <span>{showVentas ? "▲" : "▼"}</span>
            </Link>
            {showVentas && (
              <div className="dropdown">
                <Link to={"/ventas"} className="venta-item">
                  <i className="fa-solid fa-cash-register"></i> Ventas de servicios
                </Link>
              </div>
            )}
          </div>

          {/* Logout */}
          <div>
            <Link to={"/login"} onClick={logout} className="logout">
              <i className="fa-solid fa-sign-out-alt"></i> Cerrar sesión
            </Link>
          </div>
        </nav>
      </aside>
    </div>
  );
};

export default Navegacion;
