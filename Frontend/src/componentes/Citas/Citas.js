import React from "react";
import { Link } from 'react-router-dom';
import ListaCitas from '../Citas/ListaCitas'

const Citas = () => {
  return (
    <>
      <h2>Citas</h2>

      <Link to="/citas/nueva" className="btn btn-verde nvo-cita">
        <i className="fas fa-plus-circle"></i>
        Nueva Cita
      </Link>

      <ListaCitas />
    </>
  );
};

export default Citas;
