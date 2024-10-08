import React from "react";
import { Link } from 'react-router-dom';

const Citas = () => {
  return (
    <>
      <h2>Citas</h2>

      {/* Botón para agregar una nueva cita que redirige a /citas/nueva */}
      <Link to="/citas/nueva" className="btn btn-verde nvo-cita">
        <i className="fas fa-plus-circle"></i> {/* Icono para el botón */}
        Nueva Cita
      </Link>
    </>
  );
};

export default Citas;
