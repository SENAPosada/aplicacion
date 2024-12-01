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
        permisos: [], // Se añade el campo para permisos
    });

    // Lista de componentes
    const componentes = [
        { id: "roles", nombre: "Roles" },
        { id: "dashboard", nombre: "Dashboard" },
        { id: "horarios", nombre: "Horarios" },
        { id: "usuarios", nombre: "Usuarios" },
        { id: "clientes", nombre: "Clientes" },
        { id: "categorias", nombre: "Categorías" },
        { id: "servicios", nombre: "Servicios" },
        { id: "tecnicos", nombre: "Técnicos" },
        { id: "repuestos", nombre: "Repuestos" },
        { id: "citas", nombre: "Citas" },
        { id: "ventas", nombre: "Ventas" },
    ];

    // Función para consultar el rol desde la API
    const consultarAPI = async () => {
        const rolConsulta = await clienteAxios.get(`/roles/${id}`);
        setRol(rolConsulta.data);
    };

    // Función para manejar la actualización del rol
    const actualizarRol = async (e) => {
        e.preventDefault();
        try {
            await clienteAxios.put(`/roles/${rol._id}`, rol);
            Swal.fire('Correcto', 'Se actualizó correctamente', 'success');
            navigate('/roles');
        } catch (error) {
            Swal.fire('Error', 'Hubo un error al actualizar el rol', 'error');
        }
    };

    // Función para manejar el cambio de los campos de texto
    const handleChange = (e) => {
        setRol({
            ...rol,
            [e.target.name]: e.target.value,
        });
    };

    // Función para manejar la selección/deselección de permisos
    const handleCheckboxChange = (e) => {
        const componentId = e.target.value;
        setRol((prevRol) => ({
            ...prevRol,
            permisos: prevRol.permisos.includes(componentId)
                ? prevRol.permisos.filter((id) => id !== componentId) // Deseleccionar
                : [...prevRol.permisos, componentId], // Seleccionar
        }));
    };

    useEffect(() => {
        consultarAPI();
    }, [id]);

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

                <div className="campo">
                    <label>Selecciona los permisos:</label>
                    <div>
                        {componentes.map((componente) => (
                            <div key={componente.id}>
                                <input
                                    type="checkbox"
                                    value={componente.id}
                                    checked={rol.permisos.includes(componente.id)}
                                    onChange={handleCheckboxChange}
                                />
                                <label>{componente.nombre}</label>
                            </div>
                        ))}
                    </div>
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
