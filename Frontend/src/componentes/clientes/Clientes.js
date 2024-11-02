import React, { useEffect, useState, Fragment } from "react";
import clienteAxios from "../../config/axios";
import Cliente from "./Cliente";
import { Link } from 'react-router-dom';
import getConfig from "../../utils/config";

function Clientes() {
    const [clientes, guardarClientes] = useState([]);

    const consultarAPI = async () => {
        // try {
            const clientesConsulta = await clienteAxios.get("/clientes");
            guardarClientes(clientesConsulta.data);

            
      
    };

    useEffect(() => {
        consultarAPI();
    }, [clientes]); // Solo ejecuta la consulta una vez, al montar el componente

    return (
        <Fragment>
           {/* { <error & <p></p>} */}
            <h2>Clientes</h2>

            {/* Botón para agregar nuevo cliente siempre visible */}
            <Link to={"/clientes/nuevo"} className="btn btn-verde nvo-cliente">
                <i className="fas fa-plus-circle"></i>
                Nuevo Cliente
            </Link>

            {/* Solo muestra la tabla si hay clientes */}
            {clientes.length > 0 && (
                <table className="tabla-clientes">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Tipo documento</th>
                            <th>Cedula</th>
                            <th>Empresa</th>
                            <th>Email</th>
                            <th>Teléfono</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.map(cliente => (
                            <Cliente
                                key={cliente._id}
                                cliente={cliente}
                            />
                        ))}
                    </tbody>
                </table>
            )}
        </Fragment>
    );
}

export default Clientes;
