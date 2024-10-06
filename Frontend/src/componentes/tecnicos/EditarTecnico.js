import React, { useState, useEffect, Fragment } from "react";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";
import clienteAxios from "../../config/axios";


function EditarTecnico() {
    // Hook para redireccionar
    const navigate = useNavigate();

    // Usar el hook useParams para obtener el id de los parámetros de la URL
    const { id } = useParams();

    const [tecnico, datosTecnico] = useState({
        // Objeto para almacenar los datos del técnico
        nombre: "",
        apellido: "",
        email: "",
        telefono: "",
    });

    // Consultar API para obtener los datos del técnico por id
    const consultarAPI = async () => {
        const tecnicoConsulta = await clienteAxios.get(`/tecnicos/${id}`);
        // Guardar en el state
        console.log("tecnicoConsulta.data: ", tecnicoConsulta.data);
        datosTecnico(tecnicoConsulta.data);
    };

    // Envío de petición para actualizar técnico
    const actualizarTecnico = e => {
        e.preventDefault();
        clienteAxios.put(`/tecnicos/${tecnico._id}`, tecnico)
            .then(res => {
                // Validar si hay errores de mongo
                if (res.data.code === 11000) {
                    Swal.fire({
                        type: 'error',
                        title: 'Hubo un error',
                        text: 'El técnico ya está registrado'
                    });
                } else {
                    Swal.fire(
                        'Correcto',
                        'Se actualizó correctamente',
                        "success"
                    );
                }
                // Redireccionar a la lista de técnicos
                navigate('/tecnicos');
            })
            .catch(error => {
                console.error(error);
                Swal.fire({
                    type: 'error',
                    title: 'Error',
                    text: 'No se pudo actualizar el técnico'
                });
            });
    };

    // useEffect, para cargar los datos del técnico cuando el componente monta
    useEffect(() => {
        consultarAPI();
    }, []);

    // Leer datos del formulario
    const handleChange = e => {
        // Almacenar lo que el usuario escribe en el state
        datosTecnico({
            // Obtener copia del state actual
            ...tecnico,
            [e.target.name]: e.target.value
        });
        console.log(tecnico);
    };

    // Validar formulario
    const validarTecnico = () => {
        const { nombre, apellido, email, telefono } = tecnico;
        // Revisar que las propiedades del state tengan contenido
        let valido = !nombre.length || !apellido.length || !email.length || !telefono.length;
        return valido;
    };

    return (
        <Fragment>
            <h2>Editar Técnico</h2>
            <form
                onSubmit={actualizarTecnico}
            >
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input 
                        type="text"
                        placeholder="Nombre Técnico"
                        name="nombre"
                        onChange={handleChange}
                        value={tecnico.nombre}
                    />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input 
                        type="text"
                        placeholder="Apellido Técnico"
                        name="apellido"
                        onChange={handleChange}
                        value={tecnico.apellido}
                    />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input 
                        type="email"
                        placeholder="Email Técnico"
                        name="email"
                        onChange={handleChange}
                        value={tecnico.email}
                    />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input 
                        type="tel"
                        placeholder="Teléfono Técnico"
                        name="telefono"
                        onChange={handleChange}
                        value={tecnico.telefono}
                    />
                </div>

                <div className="enviar">
                    <input
                        type="submit"
                        className="btn btn-azul"
                        value="Guardar Cambios"
                        disabled={validarTecnico()}
                    />
                </div>
            </form>
        </Fragment>
    );
}

export default EditarTecnico;
