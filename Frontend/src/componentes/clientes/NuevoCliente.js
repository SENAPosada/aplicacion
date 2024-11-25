import React, { useState, Fragment } from "react";
import Swal from "sweetalert2";
// para redireccionar 
import { useNavigate } from "react-router-dom";
import clienteAxios from "../../config/axios";

function NuevoCliente({cerrarModal}) {
    // Hook para redireccionar
    const navigate = useNavigate();

    const [cliente, guardarCliente] = useState({
        // objeto
        nombres: "",
        apellidos: "",
        empresa: "",
        email: "",
        telefono: "",
        tipoDocumento: "", // Añadido tipo de documento
        documento: "",      // Añadido documento
        direccion: ""        // Añadido dirección
    });

    // Leer datos del formulario
    const handleChange = e => {
        // Almacenar lo que el usuario escribe en el state
        guardarCliente({
            // obtener copia del state actual
            ...cliente,
            [e.target.name]: e.target.value
        });
        console.log(cliente);
    };

    // Añade en la REST API (backend) un cliente nuevo
    const agregarCliente = e => {
        e.preventDefault();
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
                    cerrarModal();
                }
                // redireccionar 
                navigate('/clientes');
            });
    };

    // Validar formulario
    const validarCliente = () => {
        const { nombres, apellidos, email, empresa, telefono, tipoDocumento, documento, direccion } = cliente;
        // Revisar que las propiedades del state tengan contenido
        let valido = !nombres.length || !apellidos.length || !email.length || !empresa.length ||
            !telefono.length || !tipoDocumento.length || !documento.length || !direccion.length;
        return valido;
    };

    return (
        <Fragment>
          <form onSubmit={agregarCliente}>
    <legend>Crear Cliente</legend>
    <div className="campo">
        <label>Nombres:</label>
        <input
            type="text"
            placeholder="Nombres Cliente"
            name="nombres"
            onChange={handleChange}
        />
    </div>

    <div className="campo">
        <label>Apellidos:</label>
        <input
            type="text"
            placeholder="Apellidos Cliente"
            name="apellidos"
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
        <label>Documento:</label>
        <input
            type="text"
            placeholder="Documento"
            name="documento"
            onChange={handleChange}
            value={cliente.documento}
        />
    </div>

    <div className="campo">
        <label>Empresa:</label>
        <input
            type="text"
            placeholder="Empresa Cliente"
            name="empresa"
            onChange={handleChange}
        />
    </div>

    <div className="campo">
        <label>Email:</label>
        <input
            type="email"
            placeholder="Email Cliente"
            name="email"
            onChange={handleChange}
        />
    </div>

    <div className="campo">
        <label>Teléfono:</label>
        <input
            type="tel"
            placeholder="Teléfono Cliente"
            name="telefono"
            onChange={handleChange}
        />
    </div>

    <div className="campo">
        <label>Dirección:</label>
        <input
            type="text"
            placeholder="Dirección Cliente"
            name="direccion"
            onChange={handleChange}
            value={cliente.direccion}
        />
    </div>

    <div className="enviar">
        <input
            type="submit"
            className="btn btn-azul"
            value="Guardar Cliente"
            disabled={validarCliente()}
        />
    </div>
</form>

        </Fragment>
    );
}

export default NuevoCliente;
