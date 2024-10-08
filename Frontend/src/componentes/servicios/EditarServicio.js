import React, { useState, useEffect, Fragment } from "react";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";
import clienteAxios from "../../config/axios";

function EditarServicio() {
    // Hook para redireccionar
    const navigate = useNavigate();

    // Usar el hook useParams para obtener el id de los parámetros de la URL
    const { id } = useParams();

    const [servicio, datosServicio] = useState({
        // objeto
        tipo: "", // Propiedad del servicio
    });

    // Consultar el servicio desde la API
    const consultarAPI = async () => {
        const servicioConsulta = await clienteAxios.get(`/servicios/${id}`);
        // Guardar en el state
        console.log("servicioConsulta.data: ", servicioConsulta.data);
        datosServicio(servicioConsulta.data);
    };

    // Envío de petición para actualizar servicio
    const actualizarServicio = e => {
        e.preventDefault();
        clienteAxios.put(`/servicios/${servicio._id}`, servicio)
            .then(res => {
                // Validar si hay errores de mongo
                if (res.data.code === 11000) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Hubo un error',
                        text: 'El servicio ya está registrado'
                    });
                } else {
                    Swal.fire(
                        'Correcto',
                        'Se actualizó correctamente',
                        "success"
                    );
                }
                // Redireccionar a la página de servicios
                navigate('/servicios');
            });
    };

    // useEffect, cuando el componente carga
    useEffect(() => {
        consultarAPI();
    }, []);

    // Leer datos del formulario
    const handleChange = e => {
        // Almacenar lo que el usuario escribe en el state
        datosServicio({
            ...servicio,
            [e.target.name]: e.target.value
        });
        console.log(servicio);
    };

    // Validar formulario
    const validarServicio = () => {
        const { tipo } = servicio;
        // Revisar que la propiedad del state tenga contenido
        return !tipo.length;
    };

    return (
        <Fragment>
            <h2>Editar Servicio</h2>
            <form onSubmit={actualizarServicio}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Tipo de Servicio:</label>
                    <input
                        type="text"
                        placeholder="Nombre del Servicio"
                        name="tipo"
                        onChange={handleChange}
                        value={servicio.tipo}
                    />
                </div>

                <div className="enviar">
                    <input
                        type="submit"
                        className="btn btn-azul"
                        value="Guardar Cambios"
                        disabled={validarServicio()}
                    />
                </div>
            </form>
        </Fragment>
    );
}

export default EditarServicio;
