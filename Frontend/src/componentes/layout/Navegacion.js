import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';

const Navegacion = () => {

    const { logout } = useAuthContext();
    return (
        <aside className="sidebar col-3">
            <h2>Administración</h2>
            <nav className="navegacion">
                <Link to={"/dashboard"} className="dashboard">Dashboard</Link>
                <Link to={"/horarios"} className="horarios">Turnos</Link>
                <Link to={"/"} className="clientes">Clientes</Link>
                <Link to={"/tecnicos"} className="tecnicos">Técnicos</Link>
                <Link to={"/servicios"} className="servicios">Servicios</Link>
                <Link to={"/categorias"} className="categorias">Categorías de servicios</Link>
                <Link to={"/repuestos"} className="repuestos">Repuestos</Link>
                <Link to={"/citas"} className="citas">Citas</Link>
                <Link to={"/ventas"} className="ventas">Ventas</Link>
                 <button onClick={() => logout()}>Cerrar Sesión</button>
            </nav>
        </aside>
    );
};

export default Navegacion;



