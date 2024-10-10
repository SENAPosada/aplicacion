import React, { useState, Fragment } from "react";
import Swal from "sweetalert2";
// para redireccionar 
import { useNavigate } from "react-router-dom";
import clienteAxios from "../../config/axios";


function NuevoTecnico() {
    // Hook para redireccionar
    const navigate = useNavigate();

    const [tecnico, guardarTecnico] = useState({
        // objeto para almacenar datos del técnico
        nombre: "",
        apellido: "",
        email: "",
        telefono: "",
    });

    // Leer datos del formulario
    const handleChange = e => {
        // Almacenar lo que el usuario escribe en el state
        guardarTecnico({
            // obtener copia del state actual
            ...tecnico,
            [e.target.name]: e.target.value
        });
        console.log(tecnico);
    }

    // Añade en la REST API (backend) un técnico nuevo
    const agregarTecnico = e => {
        e.preventDefault();
        // Enviar petición
        clienteAxios.post('/tecnicos', tecnico)
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
                        'Se agregó el Técnico',
                        res.data.mensaje,
                        "success"
                    );
                }
                // redireccionar a la lista de técnicos
                navigate('/tecnicos');
            })
            .catch(error => {
                console.error(error);
                Swal.fire({
                    type: 'error',
                    title: 'Error',
                    text: 'No se pudo agregar el técnico'
                });
            });
    }

    // Validar formulario
    const validarTecnico = () => {
        const { nombre, apellido, email, telefono } = tecnico;
        // Revisar que las propiedades del state tengan contenido
        let valido = !nombre.length || !apellido.length || !email.length || !telefono.length;
        return valido;
    }

    return (
        <Fragment>
            <h2>Nuevo Técnico</h2>
            <form
                onSubmit={agregarTecnico}
            >
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input
                        type="text"
                        placeholder="Nombre Técnico"
                        name="nombre"
                        onChange={handleChange}
                    />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input
                        type="text"
                        placeholder="Apellido Técnico"
                        name="apellido"
                        onChange={handleChange}
                    />
                </div>

                <div className="campo">
                    <label>Tipo de Documento:</label>
                    <select
                        name="tipoDocumento"
                        onChange={handleChange}
                        value={tecnico.tipoDocumento}
                    >
                        <option value="">-- Seleccionar --</option>
                        <option value="Cédula de Ciudadanía">Cédula de Ciudadanía</option>
                        <option value="Pasaporte">Pasaporte</option>
                        <option value="Tarjeta de Identidad">Tarjeta de Identidad</option>
                        <option value="Cédula de Extranjería">Cédula de Extranjería</option>
                    </select>
                </div>

                <div className="campo">
                    <label>Cédula:</label>
                    <input
                        type="text"
                        placeholder="Cédula o Documento"
                        name="cedula"
                        onChange={handleChange}
                        value={tecnico.cedula}
                    />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input
                        type="email"
                        placeholder="Email Técnico"
                        name="email"
                        onChange={handleChange}
                    />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input
                        type="tel"
                        placeholder="Teléfono Técnico"
                        name="telefono"
                        onChange={handleChange}
                    />
                </div>

                <div className="enviar">
                    <input
                        type="submit"
                        className="btn btn-azul"
                        value="Agregar Técnico"
                        disabled={validarTecnico()}
                    />
                </div>
            </form>
        </Fragment>
    );
}

export default NuevoTecnico;
