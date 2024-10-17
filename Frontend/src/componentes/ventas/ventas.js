import React from "react";
import { Link } from 'react-router-dom';
import ListaVentas from "./ListaVentas";

const Ventas = () => {
  return (
    <>
      <h2>Ventas</h2>

      <Link to="/ventas/nueva" className="btn btn-verde nvo-cita">
        <i className="fas fa-plus-circle"></i>
        Nueva Venta
      </Link>

      <ListaVentas />
    </>
  );
};

export default Ventas;
