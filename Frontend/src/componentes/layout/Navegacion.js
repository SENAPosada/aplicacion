import React from 'react';
import { Link } from 'react-router-dom';

const Navegacion = () => {
    return (
        <aside className="sidebar col-3">
            <h2>Administración</h2>
            <nav className="navegacion">
                <Link to={"/horarios"} className="horarios">Turnos</Link>
                <Link to={"/"} className="clientes">Clientes</Link>
                <Link to={"/tecnicos"} className="tecnicos">Técnicos</Link>
                <Link to={"/servicios"} className="servicios">Servicios</Link>
                <Link to={"/categorias"} className="categorias">Categorías de servicios</Link>
                <Link to={"/repuestos"} className="repuestos">Repuestos</Link>
                <Link to={"/citas"} className="citas">Citas</Link>
            </nav>
        </aside>
    );
};

export default Navegacion;
