import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
function NuevoCliente({ cerrarModal }) {
    const navigate = useNavigate();

    const [cliente, guardarCliente] = useState({
        nombre: "",      // 'nombre' en vez de 'nombres'
        apellido: "",    // 'apellido' en vez de 'apellidos'
        empresa: "",
        email: "",
        telefono: "",
        tipoDocumento: "",
        cedula: "",      // 'cedula' en vez de 'documento'
        direccion: ""    // 'direccion' es correcto
    });

    const handleChange = e => {
        guardarCliente({
            ...cliente,
            [e.target.name]: e.target.value
        });
    };

    const validarCliente = () => {
        const { nombre, apellido, email, empresa, telefono, tipoDocumento, cedula, direccion } = cliente;
        return !nombre.length || !apellido.length || !email.length || !empresa.length ||
            !telefono.length || !tipoDocumento.length || !cedula.length || !direccion.length;
    };

    const agregarCliente = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const res = await clienteAxios.post("/clientes", cliente, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            Swal.fire('Correcto', 'Cliente agregado correctamente', 'success');
            navigate('/clientes');
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'No se pudo agregar el cliente'
            });
        }
    };

    return (
        <Fragment>
            <form onSubmit={agregarCliente}>
                <legend>Crear Cliente</legend>
                <div className="campo">
                    <label>Nombres:</label>
                    <input
                        type="text"
                        placeholder="Nombre Cliente"
                        name="nombre"    // 'nombre' es correcto
                        onChange={handleChange}
                        value={cliente.nombre}
                    />
                </div>

                <div className="campo">
                    <label>Apellidos:</label>
                    <input
                        type="text"
                        placeholder="Apellido Cliente"
                        name="apellido"    // 'apellido' es correcto
                        onChange={handleChange}
                        value={cliente.apellido}
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
                        placeholder="Cédula"
                        name="cedula"    // 'cedula' es correcto
                        onChange={handleChange}
                        value={cliente.cedula}
                    />
                </div>

                <div className="campo">
                    <label>Empresa:</label>
                    <input
                        type="text"
                        placeholder="Empresa Cliente"
                        name="empresa"
                        onChange={handleChange}
                        value={cliente.empresa}
                    />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input
                        type="email"
                        placeholder="Email Cliente"
                        name="email"
                        onChange={handleChange}
                        value={cliente.email}
                    />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input
                        type="tel"
                        placeholder="Teléfono Cliente"
                        name="telefono"
                        onChange={handleChange}
                        value={cliente.telefono}
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
