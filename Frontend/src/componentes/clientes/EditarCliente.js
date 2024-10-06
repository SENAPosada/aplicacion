import React, { useState, useEffect, Fragment } from "react";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";
import clienteAxios from "../../config/axios";

function EditarCliente() {
    // Hook para redireccionar
    const navigate = useNavigate();

    // Usar el hook useParams para obtener el id de los parámetros de la URL
    const { id } = useParams();

    const [cliente, datosCliente] = useState({
        // objeto con los nuevos campos
        nombre: "",
        apellido: "",
        tipoDocumento: "",
        cedula: "",
        empresa: "",
        email: "",
        telefono: "",
    });

    const consultarAPI = async () => {
        const clienteConsulta = await clienteAxios.get(`/clientes/${id}`);
        // guardar en el state
        datosCliente(clienteConsulta.data);
    }

    // Envio de petición para actualizar cliente
    const actualizarcliente = e => {
        e.preventDefault();
        clienteAxios.put(`/clientes/${cliente._id}`, cliente)
            .then(res => {
                if (res.data.code === 11000) {
                    Swal.fire({
                        type: 'error',
                        title: 'Hubo un error',
                        text: 'El cliente ya está registrado'
                    });
                } else {
                    Swal.fire(
                        'Correcto',
                        'Se actualizó correctamente',
                        "success"
                    );
                }
                // Redireccionar a la página principal
                navigate('/');
            });
    }

    useEffect(() => {
        consultarAPI();
    }, []);

    // Leer datos del formulario
    const handleChange = e => {
        datosCliente({
            ...cliente,
            [e.target.name]: e.target.value
        });
    }

    // Validar formulario
    const validarCliente = () => {
        const { nombre, apellido, email, empresa, telefono, tipoDocumento, cedula } = cliente;
        let valido = !nombre.length || !apellido.length || !email.length || !empresa.length || 
                     !telefono.length || !tipoDocumento.length || !cedula.length;
        return valido;
    }

    return (
        <Fragment>
            <h2>Editar Cliente</h2>
            <form onSubmit={actualizarcliente}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text"
                        placeholder="Nombre Cliente"
                        name="nombre"
                        onChange={handleChange}
                        value={cliente.nombre}
                    />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input type="text"
                        placeholder="Apellido Cliente"
                        name="apellido"
                        onChange={handleChange}
                        value={cliente.apellido}
                    />
                </div>

                <div className="campo">
                    <label>Tipo de Documento:</label>
                    <select name="tipoDocumento" onChange={handleChange} value={cliente.tipoDocumento}>
                        <option value="">-- Seleccione Tipo de Documento --</option>
                        <option value="Cédula de Ciudadanía">Cédula de Ciudadanía</option>
                        <option value="Pasaporte">Pasaporte</option>
                        <option value="Tarjeta de Identidad">Tarjeta de Identidad</option>
                        <option value="Cédula de Extranjería">Cédula de Extranjería</option>
                    </select>
                </div>

                <div className="campo">
                    <label>Cédula:</label>
                    <input type="text"
                        placeholder="Número de Documento"
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
                        value={cliente.empresa}
                    />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input type="email"
                        placeholder="Email Cliente"
                        name="email"
                        onChange={handleChange}
                        value={cliente.email}
                    />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input type="tel"
                        placeholder="Teléfono Cliente"
                        name="telefono"
                        onChange={handleChange}
                        value={cliente.telefono}
                    />
                </div>

                <div className="enviar">
                    <input
                        type="submit"
                        className="btn btn-azul"
                        value="Guardar Cambios"
                        disabled={validarCliente()}
                    />
                </div>
            </form>
        </Fragment>
    );
}

export default EditarCliente;
