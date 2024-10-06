import React, { useEffect, useState, Fragment } from "react";
import clienteAxios from "../../config/axios";
import Tecnico from "./Tecnico";
import { Link } from 'react-router-dom';

function Tecnicos() {
    const [tecnicos, guardarTecnicos] = useState([]);

    // Función para consultar la API y obtener los técnicos
    const consultarAPI = async () => {
        const tecnicosConsulta = await clienteAxios.get("/tecnicos");
        guardarTecnicos(tecnicosConsulta.data);
    };

    // useEffect para cargar la lista de técnicos al montar el componente
    useEffect(() => {
        consultarAPI();
    }, []); // Se ejecuta solo una vez al montar el componente

    return (
        <Fragment>
            <h2>Técnicos</h2>

            {/* Botón para agregar nuevo técnico */}
            <Link to={"/tecnicos/nuevo"} className="btn btn-verde nvo-tecnico">
                <i className="fas fa-plus-circle"></i>
                Nuevo Técnico
            </Link>

            {/* Solo muestra la tabla si hay técnicos */}
            {tecnicos.length > 0 ? (
                <table className="tabla-clientes">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Teléfono</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tecnicos.map(tecnico => (
                            <Tecnico
                                key={tecnico._id}
                                tecnico={tecnico}
                            />
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay técnicos disponibles</p>
            )}
        </Fragment>
    );
}

export default Tecnicos;
