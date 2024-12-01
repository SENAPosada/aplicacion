import React, { useState } from 'react';
import Swal from 'sweetalert2';
import clienteAxios from '../config/axios';
import { useNavigate } from 'react-router-dom';

function NuevoRol({ cerrarModal }) {
    const [rol, setRol] = useState({
        nombre: '',
        permisos: [],
    });

    const navigate = useNavigate();

    // Lista de componentes
    const componentes = [
        { id: "roles", nombre: "Roles" },
        { id: "dashboard", nombre: "dashboard" },
        { id: "horarios", nombre: "horarios" },
        { id: "usuarios", nombre: "Usuarios" },
        { id: "clientes", nombre: "Clientes" },
        { id: "categorias", nombre: "categorias" },
        { id: "servicios", nombre: "Servicios" },
        { id: "tecnicos", nombre: "Técnicos" },
        { id: "repuestos", nombre: "Repuestos" },
        { id: "citas", nombre: "Citas" },
        { id: "ventas", nombre: "Ventas" },
    ];

    // Función para manejar la selección de los checkboxes
    const handleCheckboxChange = (e) => {
        const componentId = e.target.value;
        setRol((prevRol) => ({
            ...prevRol,
            permisos: prevRol.permisos.includes(componentId)
                ? prevRol.permisos.filter((id) => id !== componentId) // Deseleccionar
                : [...prevRol.permisos, componentId] // Seleccionar
        }));
    };

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const respuesta = await clienteAxios.post('/roles', rol);

            // Si la respuesta es exitosa, mostrar un mensaje de éxito y cerrar el modal
            Swal.fire({
                icon: 'success',
                title: 'Rol creado',
                text: respuesta.data.mensaje,
            });

            // Redirigir al listado de roles o cualquier página que desees
            navigate('/roles');
            cerrarModal();
        } catch (error) {
            // Si hay un error, mostrar un mensaje de error
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al crear el rol',
            });
        }
    };

    return (
        <div className="formulario-rol">
            <h2>Nuevo Rol</h2>
            <form onSubmit={handleSubmit}>
                <div className="campo">
                    <label>Nombre:</label>
                    <input
                        type="text"
                        name="nombre"
                        placeholder="Nombre del rol"
                        value={rol.nombre}
                        onChange={(e) => setRol({ ...rol, nombre: e.target.value })}
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
                    <input type="submit" value="Crear Rol" />
                </div>
            </form>
        </div>
    );
}

export default NuevoRol;
