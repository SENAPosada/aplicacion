import React, { useEffect, useState, Fragment } from "react";
import clienteAxios from "../config/axios";
import Usuario from "./Usuario";
import { Link } from "react-router-dom";
import useUsuariosStore from "../store/useUsuarios.store";

function Usuarios() {
    const { fetchUsuarios, usuarios } = useUsuariosStore();



    useEffect(() => {
        fetchUsuarios()
      
        
    }, [fetchUsuarios]);
    console.log({usuarios});
    return (
        <Fragment>
            <h2>Usuarios</h2>

            <Link to={"/usuarios/nuevo"} className="btn btn-verde nvo-usuario">
                <i className="fas fa-plus-circle"></i>
                Nuevo Usuario
            </Link>

            {usuarios.length > 0 ? (
                <table className="tabla-clientes">
                    <thead>
                        <tr>
                            <th>Nombres</th>
                            <th>Apellidos</th>
                            <th>Email</th>
                            <th>Teléfono</th>
                            <th>Rol</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map(usuario => (
                            <Usuario
                                key={usuario._id}
                                usuario={usuario}
                            />
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay usuarios registrados</p>
            )}
        </Fragment>
    );
}

export default Usuarios;