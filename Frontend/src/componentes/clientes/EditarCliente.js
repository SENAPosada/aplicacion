import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
function EditarCliente() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [cliente, datosCliente] = useState({
        nombre: "",       // 'nombre' en vez de 'nombres'
        apellido: "",     // 'apellido' en vez de 'apellidos'
        tipoDocumento: "",
        cedula: "",       // 'cedula' en vez de 'documento'
        empresa: "",
        email: "",
        telefono: "",
        direccion: "",    // 'direccion' es correcto
    });

    const consultarAPI = async () => {
        try {
            const token = localStorage.getItem("token"); 
            const clienteConsulta = await clienteAxios.get(`/clientes/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            datosCliente(clienteConsulta.data);
        } catch (error) {
            console.error("Error al consultar cliente:", error);
        }
    };

    const actualizarCliente = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const res = await clienteAxios.put(`/clientes/${id}`, cliente, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.data.code === 11000) {
                Swal.fire({
                    icon: "error",
                    title: "Hubo un error",
                    text: "El cliente ya está registrado",
                });
            } else {
                Swal.fire("Correcto", "Se actualizó correctamente", "success");
                navigate("/clientes");
            }
        } catch (error) {
            console.error("Error al actualizar cliente:", error);
        }
    };

    useEffect(() => {
        consultarAPI();
    }, []);

    const handleChange = (e) => {
        datosCliente({
            ...cliente,
            [e.target.name]: e.target.value,
        });
    };

    const validarCliente = () => {
        const { nombre, apellido, email, empresa, telefono, tipoDocumento, cedula } = cliente;
        return !nombre.length || !apellido.length || !email.length || !empresa.length || !telefono.length || !tipoDocumento.length || !cedula.length;
    };

    return (
        <Fragment>
            <h2>Editar Cliente</h2>
            <form onSubmit={actualizarCliente}>
                <legend>Llena todos los campos</legend>

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
                        name="apellido"   // 'apellido' es correcto
                        onChange={handleChange}
                        value={cliente.apellido}
                    />
                </div>

                <div className="campo">
                    <label>Tipo de Documento:</label>
                    <select name="tipoDocumento" onChange={handleChange} value={cliente.tipoDocumento}>
                        <option value="">-- Seleccionar Tipo de Documento --</option>
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
                        placeholder="Número de Documento"
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
                        value="Guardar Cambios"
                        disabled={validarCliente()}
                    />
                </div>
            </form>
        </Fragment>
    );
}

export default EditarCliente;
