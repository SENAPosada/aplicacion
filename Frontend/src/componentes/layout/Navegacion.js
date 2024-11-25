import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navegacion = () => {
    const [showConfiguracion, setShowConfiguracion] = useState(false);
    const [showAgendamiento, setShowAgendamiento] = useState(false);
    const [showServicios, setShowServicios] = useState(false);
    const [showVentas, setShowVentas] = useState(false);

    const toggleConfiguracion = () => setShowConfiguracion(!showConfiguracion);
    const toggleAgendamiento = () => setShowAgendamiento(!showAgendamiento);
    const toggleServicios = () => setShowServicios(!showServicios);
    const toggleVentas = () => setShowVentas(!showVentas);

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
                                <Link to={"/servicios"} className="servicio-item">
                                    <i className="fa-solid fa-concierge-bell"></i> Servicios
                                </Link>
                                <Link to={"/categorias"} className="categoria-item">
                                    <i className="fa-solid fa-layer-group"></i> Categorías
                                </Link>
                                {/* Repuestos */}
                                <Link to={"/repuestos"} className="repuestos">
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


                </nav>
            </aside>
        </div>
    );
};

export default Navegacion;
