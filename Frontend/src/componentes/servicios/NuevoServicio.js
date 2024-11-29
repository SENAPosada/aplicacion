import React, { useState, Fragment } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../../config/axios";

function NuevoServicio({cerrarModal}) {
    // Hook para redireccionar
    const navigate = useNavigate();

    const [servicio, guardarServicio] = useState({
        tipo: "", // Cambiar "tipo" según el campo que defina el servicio
    });

    // Leer datos del formulario
    const handleChange = e => {
        // Almacenar lo que el usuario escribe en el state
        guardarServicio({
            ...servicio,
            [e.target.name]: e.target.value
        });
        console.log(servicio);
    };

    // Añade en la REST API (backend) un servicio nuevo
    const agregarServicio = e => {
        e.preventDefault();
        clienteAxios.post('/servicios', servicio) // Cambiado a la ruta de servicios
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
                        'Se agregó el Servicio',
                        res.data.mensaje,
                        "success"
                    );
                    cerrarModal();
                }
                // Redireccionar 
                navigate('/servicios'); // Redirige a la lista de servicios
            });
    };

    // Validar formulario
    const validarServicio = () => {
        const { tipo } = servicio; // Cambiar "tipo" según los campos del servicio
        // Revisar que la propiedad del state tenga contenido
        return !tipo.length;
    };

    return (
        <Fragment>
            <form onSubmit={agregarServicio}>
                <legend>Crear servicio</legend>

                <div className="campo">
                    <label>Tipo de Servicio:</label>
                    <input
                        type="text"
                        placeholder="Nombre del Servicio"
                        name="tipo" // Cambiar el campo según la estructura del servicio
                        onChange={handleChange}
                    />
                </div>

                <div className="enviar">
                    <input
                        type="submit"
                        className="btn btn-azul"
                        value="Agregar Servicio"
                        disabled={validarServicio()}
                    />
                </div>
            </form>
        </Fragment>
    );
}

export default NuevoServicio;
