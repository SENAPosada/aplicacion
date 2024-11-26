import React, { useState, useEffect, Fragment } from "react";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";
import clienteAxios from '../config/axios';

function EditarRol() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [rol, setRol] = useState({
        nombre: "",
        descripcion: "",
    });

    const consultarAPI = async () => {
        const rolConsulta = await clienteAxios.get(`/roles/${id}`);
        setRol(rolConsulta.data);
    };

    const actualizarRol = e => {
        e.preventDefault();
        clienteAxios.put(`/roles/${rol._id}`, rol)
            .then(res => {
                Swal.fire('Correcto', 'Se actualizó correctamente', "success");
                navigate('/roles');
            });
    };

    useEffect(() => {
        consultarAPI();
    }, []);

    const handleChange = e => {
        setRol({
            ...rol,
            [e.target.name]: e.target.value
        });
    };

    return (
        <Fragment>
            <h2>Editar Rol</h2>
            <form onSubmit={actualizarRol}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input
                        type="text"
                        placeholder="Nombre del Rol"
                        name="nombre"
                        onChange={handleChange}
                        value={rol.nombre}
                    />
                </div>

                <div className="campo">
                    <label>Descripción:</label>
                    <input
                        type="text"
                        placeholder="Descripción del Rol"
                        name="descripcion"
                        onChange={handleChange}
                        value={rol.descripcion}
                    />
                </div>

                <div className="enviar">
                    <input
                        type="submit"
                        className="btn btn-azul"
                        value="Guardar Rol"
                    />
                </div>
            </form>
        </Fragment>
    );
}

export default EditarRol;
