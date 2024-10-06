import React, { useState, Fragment } from "react";
import Swal from "sweetalert2";
// para redireccionar 
import { useNavigate } from "react-router-dom";
import clienteAxios from "../../config/axios";

function NuevoCliente() {
    // Hook para redireccionar
    const navigate = useNavigate();

    const [cliente, guardarCliente] = useState({
        // objeto
        nombre: "",
        apellido: "",
        empresa: "",
        email: "",
        telefono: "",
        tipoDocumento: "", // Añadido tipo de documento
        cedula: ""         // Añadido cedula
    });

    // Leer datos del formulario
    const handleChange = e => {
        // Almacenar lo que el usuario escribe en el state
        guardarCliente({
            // obtener copia del state actual
            ...cliente,
            [e.target.name]: e.target.value
        })
        console.log(cliente)
    }

    // Añade en la REST API (backend) un cliente nuevo
    const agregarCliente = e => {
        e.preventDefault()
        // Enviar petición
        clienteAxios.post('/clientes', cliente)
            .then(res => {
                // Validar si hay errores de mongo
                if (res.data.code === 11000) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Hubo un error',
                        text: 'El cliente ya está registrado'
                    });
                } else {
                    Swal.fire(
                        'Se agregó el Cliente',
                        res.data.mensaje,
                        "success"
                    );
                }
                // redireccionar 
                navigate('/');
            })
    }

    // Validar formulario
    const validarCliente = () => {
        const { nombre, apellido, email, empresa, telefono, tipoDocumento, cedula } = cliente;
        // Revisar que las propiedades del state tengan contenido
        let valido = !nombre.length || !apellido.length || !email.length || !empresa.length ||
            !telefono.length || !tipoDocumento.length || !cedula.length;
        return valido;
    }

    return (
        <Fragment>
            <h2>Nuevo Cliente</h2>
            <form
                onSubmit={agregarCliente}
            >
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text"
                        placeholder="Nombre Cliente"
                        name="nombre"
                        onChange={handleChange}
                    />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input type="text"
                        placeholder="Apellido Cliente"
                        name="apellido"
                        onChange={handleChange}
                    />
                </div>

                <div className="campo">
                    <label>Tipo de Documento:</label>
                    <select
                        name="tipoDocumento"
                        onChange={handleChange}
                        value={cliente.tipoDocumento}
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
                        value={cliente.cedula}
                    />
                </div>

                <div className="campo">
                    <label>Empresa:</label>
                    <input type="text"
                        placeholder="Empresa Cliente"
                        name="empresa"
                        onChange={handleChange}
                    />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input type="email"
                        placeholder="Email Cliente"
                        name="email"
                        onChange={handleChange}
                    />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input type="tel"
                        placeholder="Teléfono Cliente"
                        name="telefono"
                        onChange={handleChange}
                    />
                </div>

                <div className="enviar">
                    <input
                        type="submit"
                        className="btn btn-azul"
                        value="Agregar Cliente"
                        disabled={validarCliente()}
                    />
                </div>
            </form>
        </Fragment>
    );
}

export default NuevoCliente;
