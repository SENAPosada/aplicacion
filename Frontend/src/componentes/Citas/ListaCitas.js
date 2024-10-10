import React, { useEffect, useState, Fragment } from "react";
import clienteAxios from "../../config/axios";
import { Link } from 'react-router-dom';

function CitasList() {
    const [citas, setCitas] = useState([]);

    useEffect(() => {
        const fetchCitas = async () => {
            const response = await clienteAxios.get('/citas');
            setCitas(response.data);
        };
        fetchCitas();
    }, []);

    return (
        <Fragment>
            {citas.length > 0 ? (
                <table className="tabla-citas">
                    <thead>
                        <tr>
                            <th>Cliente</th>
                            <th>Técnico</th>
                            <th>Dirección</th>
                            <th>Ciudad</th>
                            <th>Fecha</th>
                            <th>Horario</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {citas.map(cita => (
                            <tr key={cita._id}>
                                <td>{cita.cliente}</td>
                                <td>{cita.tecnico}</td>
                                <td>{cita.direccion}</td>
                                <td>{cita.ciudad}</td>
                                <td>{new Date(cita.fecha).toLocaleDateString()}</td>
                                <td>{cita.horario}</td>
                                <td>
                                    <Link to={`/citas/editar/${cita._id}`} className="btn btn-azul">
                                        Editar
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay citas disponibles</p>
            )}
        </Fragment>
    );
}

export default CitasList;
